import * as vscode from "vscode";
import { Axios } from "axios";
import { REFRESH_TIME } from "../constants";

export default class QueueEditor
  implements vscode.CustomReadonlyEditorProvider
{
  context: vscode.ExtensionContext;
  managementAPI: Axios;

  constructor(context: vscode.ExtensionContext, managementAPI: Axios) {
    this.context = context;
    this.managementAPI = managementAPI;
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
    webviewPanel.title = document.uri.path;
    webviewPanel.webview.options = { enableScripts: true };

    // TODO: use single interval for queries to all webviews
    const updateFunction = async () => {
      const name = document.uri.path;

      try {
        const { data: overview } = await this.managementAPI.request({
          method: "get",
          url: `/queues/%2F/${name}`,
        });

        const { data: bindings } = await this.managementAPI.request({
          method: "get",
          url: `/queues/%2F/${name}/bindings`,
        });

        webviewPanel.webview.postMessage({ name, bindings, overview });
      } catch (e) {
        vscode.window.showErrorMessage(
          "Rabbitrace: Failed to get queue information"
        );
      }
    };

    await updateFunction();
    const interval = setInterval(updateFunction, REFRESH_TIME);
    webviewPanel.onDidChangeViewState(
      async () => webviewPanel.visible && (await updateFunction())
    );

    webviewPanel.onDidDispose(() => {
      clearInterval(interval);
    });
    webviewPanel.webview.onDidReceiveMessage(async (message) => {
      if (message.type === "add-binding") {
        try {
          await this.managementAPI.request({
            method: "post",
            url: `/bindings/%2F/e/${message.data.source}/q/${message.data.destination}`,
            data: { ...message.data, vhost: "/" },
          });
          vscode.window.showInformationMessage(
            `Rabbitrace: Added new binding with ${message.data.source}`
          );
        } catch (e) {
          vscode.window.showErrorMessage(
            `Rabbitrace: Failed to add binding with ${message.data.source}`
          );
        }
      }

      if (message.type === "remove-binding") {
        try {
          await this.managementAPI.request({
            method: "delete",
            url: `/bindings/%2F/e/${message.data.source}/q/${message.data.destination}/${message.data.properties_key}`,
            data: message.data,
          });
          vscode.window.showInformationMessage(
            `Rabbitrace: Removed binding with ${message.data.source}`
          );
        } catch (e) {
          vscode.window.showErrorMessage(
            `Rabbitrace: Failed to remove binding with ${message.data.source}`
          );
        }
      }

      if (message.type === "publish-message") {
        try {
          await this.managementAPI.request({
            method: "post",
            url: `/exchanges/%2F/amq.default/publish`,
            data: { ...message.data, vhost: "/" },
          });
          vscode.window.showInformationMessage(
            "Rabbitrace: Successfully published message"
          );
        } catch (e) {
          vscode.window.showErrorMessage(
            "Rabbitrace: Failed to publish message"
          );
        }
      }

      if (message.type === "purge-messages") {
        try {
          await this.managementAPI.request({
            method: "delete",
            url: `/queues/%2F/${message.data.name}/contents`,
            data: { ...message.data, vhost: "/" },
          });
          vscode.window.showInformationMessage(
            "Rabbitrace: Successfully purged messages"
          );
        } catch (e) {
          vscode.window.showErrorMessage(
            "Rabbitrace: Failed to purge messages"
          );
        }
      }

      await updateFunction();
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
