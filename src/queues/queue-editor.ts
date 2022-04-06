import * as vscode from "vscode";
import axios from "axios";
import {
  BASE_URL,
  QUEUES,
  LIST_BINDINGS_QUEUE,
  AUTH,
  REFRESH_TIME,
  VHOST,
} from "../constants";

export default class QueueEditor
  implements vscode.CustomReadonlyEditorProvider
{
  context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }

  openCustomDocument(uri: vscode.Uri): vscode.CustomDocument {
    return {
      uri,
      dispose: () => {
        /* */
      },
    };
  }

  async resolveCustomEditor(
    document: vscode.CustomDocument,
    webviewPanel: vscode.WebviewPanel
  ): Promise<void> {
    webviewPanel.title = document.uri.fragment;

    webviewPanel.webview.options = {
      enableScripts: true,
    };

    // TODO: use single interval for queries to all webviews
    async function updateFunction() {
      const path = document.uri.path;

      const { data: overview } = await axios({
        method: "get",
        baseURL: BASE_URL,
        url: `${QUEUES}/${path}`,
        auth: AUTH,
      });

      const { data: bindings } = await axios({
        method: "get",
        baseURL: BASE_URL,
        url: `${QUEUES}/${path}${LIST_BINDINGS_QUEUE}`,
        auth: AUTH,
      });

      webviewPanel.webview.postMessage({ name: path, bindings, overview });
    }

    await updateFunction();
    webviewPanel.onDidChangeViewState(async () => {
      if (webviewPanel.visible) {
        await updateFunction();
      }
    });
    const interval = setInterval(updateFunction, REFRESH_TIME);

    webviewPanel.onDidDispose(() => {
      clearInterval(interval);
    });

    webviewPanel.webview.onDidReceiveMessage(async (message) => {
      if (message.type === "add-binding") {
        await axios({
          method: "post",
          baseURL: BASE_URL,
          url: `${LIST_BINDINGS_QUEUE}${VHOST}/e/${message.data.source}/q/${message.data.destination}`,
          auth: AUTH,
          data: { ...message.data, vhost: "/" },
        });

        await updateFunction();
      }

      if (message.type === "remove-binding") {
        await axios({
          method: "delete",
          baseURL: BASE_URL,
          url: `${LIST_BINDINGS_QUEUE}${VHOST}/e/${message.data.source}/q/${message.data.destination}/${message.data.properties_key}`,
          auth: AUTH,
          data: message.data,
        });

        await updateFunction();
      }
    });

    const stylesheetPath = webviewPanel.webview.asWebviewUri(
      vscode.Uri.joinPath(
        this.context.extensionUri,
        "dist/pages/queue-editor.css"
      )
    );

    const scriptPath = webviewPanel.webview.asWebviewUri(
      vscode.Uri.joinPath(
        this.context.extensionUri,
        "dist/pages/queue-editor.js"
      )
    );

    webviewPanel.webview.html = `
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="${stylesheetPath}">
        <script defer src="${scriptPath}"></script>
      </head>
      <body>
      </body>
    </html>
    `;
  }
}
