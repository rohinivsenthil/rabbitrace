import * as vscode from "vscode";
import type Connection from "./connection";
import axios from "axios";

interface NewConnectionMessage {
  action: string;
  connection: Connection;
}

export default async function newConnection(context: vscode.ExtensionContext) {
  const webviewPanel = vscode.window.createWebviewPanel(
    "rabbitmq.connections.new",
    "New Connection",
    vscode.ViewColumn.One,
    { enableScripts: true }
  );

  webviewPanel.webview.onDidReceiveMessage(
    async (message: NewConnectionMessage) => {
      switch (message.action) {
        case "save-connection":
          webviewPanel.dispose();
          await context.workspaceState.update(
            message.connection.name,
            message.connection
          );
          await vscode.commands.executeCommand("rabbitmq.connections.refresh");
          break;
        case "test-connection":
          try {
            await axios.request({
              baseURL: message.connection.mapiURL,
              method: "get",
              url: `/api/overview`,
              auth: {
                username: message.connection.mapiUsername,
                password: message.connection.mapiPassword,
              },
            });
            vscode.window.showInformationMessage(
              `Rabbitrace: Successfully tested connection`
            );
          } catch (e) {
            vscode.window.showErrorMessage(
              `Rabbitrace: Failed to establish connection`
            );
          }
          break;
      }
    }
  );

  const stylesheetPath = webviewPanel.webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, "dist/pages/new-connection.css")
  );

  const scriptPath = webviewPanel.webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, "dist/pages/new-connection.js")
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
