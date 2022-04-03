import * as vscode from "vscode";
import axios from "axios";
import {
  BASE_URL,
  EXCHANGES,
  LIST_BINDINGS_EXCHANGE,
  AUTH,
  REFRESH_TIME,
} from "../constants";

export default class ExchangeEditor
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
        url: `${EXCHANGES}/${path}`,
        auth: AUTH,
      });

      const { data: bindings } = await axios({
        method: "get",
        baseURL: BASE_URL,
        url: `${EXCHANGES}/${path}${LIST_BINDINGS_EXCHANGE}`,
        auth: AUTH,
      });

      webviewPanel.webview.postMessage({ name: path, bindings, overview });
    }

    await updateFunction();
    const interval = setInterval(updateFunction, REFRESH_TIME);
    webviewPanel.onDidChangeViewState(async () => {
      if (webviewPanel.visible) {
        await updateFunction();
      }
    });

    webviewPanel.webview.onDidReceiveMessage((message) => {
      if (message.type === "new-binding") {
        // TODO: do stuff
      }
    });

    webviewPanel.onDidDispose(() => {
      clearInterval(interval);
    });

    const stylesheetPath = webviewPanel.webview.asWebviewUri(
      vscode.Uri.joinPath(
        this.context.extensionUri,
        "dist/pages/exchange-editor.css"
      )
    );

    const scriptPath = webviewPanel.webview.asWebviewUri(
      vscode.Uri.joinPath(
        this.context.extensionUri,
        "dist/pages/exchange-editor.js"
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
