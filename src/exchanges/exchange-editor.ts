import * as vscode from "vscode";
import { Axios } from "axios";
import { REFRESH_TIME } from "../constants";

export default class ExchangeEditor
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

    webviewPanel.webview.options = {
      enableScripts: true,
    };

    // TODO: use single interval for queries to all webviews
    const updateFunction = async () => {
      const path = document.uri.path;
      try {
        const { data: overview } = await this.managementAPI.request({
          method: "get",
          url: `/exchanges/%2F/${path}`,
        });

        const { data: bindings } = await this.managementAPI.request({
          method: "get",
          url: `/exchanges/%2F/${path}/bindings/source`,
        });

        webviewPanel.webview.postMessage({ name: path, bindings, overview });
      } catch (e) {
        vscode.window.showErrorMessage(
          "Rabbitrace: Failed to get exchange information"
        );
      }
    };

    await updateFunction();
    const interval = setInterval(updateFunction, REFRESH_TIME);
    webviewPanel.onDidChangeViewState(
      async () => webviewPanel.visible && (await updateFunction())
    );

    webviewPanel.webview.onDidReceiveMessage(async (message) => {
      if (message.type === "add-binding") {
        try {
          await this.managementAPI.request({
            method: "post",
            url: `/bindings/%2F/e/${message.data.source}/${message.data.destination_type}/${message.data.destination}`,
            data: { ...message.data, vhost: "/" },
          });
          vscode.window.showInformationMessage(
            `Rabbitrace: Added new binding with ${message.data.destination}`
          );
        } catch (e) {
          vscode.window.showErrorMessage(
            `Rabbitrace: Failed to add binding with ${message.data.destination}`
          );
        }
      }

      if (message.type === "remove-binding") {
        try {
          await this.managementAPI.request({
            method: "delete",
            url: `/bindings/%2F/e/${message.data.source}/${message.data.destination_type}/${message.data.destination}/${message.data.properties_key}`,
            data: message.data,
          });
          vscode.window.showInformationMessage(
            `Rabbitrace: Removed binding with ${message.data.destination}`
          );
        } catch (e) {
          vscode.window.showErrorMessage(
            `Rabbitrace: Failed to remove binding with ${message.data.destination}`
          );
        }
      }

      if (message.type === "publish-message") {
        try {
          await this.managementAPI.request({
            method: "post",
            url: `/exchanges/%2F/${message.data.name}/publish`,
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

      await updateFunction();
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
