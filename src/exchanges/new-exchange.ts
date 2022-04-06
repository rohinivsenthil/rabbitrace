import * as vscode from "vscode";
import axios from "axios";
import { BASE_URL, EXCHANGES, AUTH } from "../constants";

export default async function newExchange(context: vscode.ExtensionContext) {
  const webviewPanel = vscode.window.createWebviewPanel(
    "rabbitmq.exchanges.new",
    "New Exchange",
    vscode.ViewColumn.One,
    { enableScripts: true }
  );

  webviewPanel.webview.onDidReceiveMessage(async (message) => {
    if (message.type === "new-exchange") {
      await axios({
        method: "put",
        baseURL: BASE_URL,
        url: `${EXCHANGES}/${message.data.name}`,
        auth: AUTH,
        data: { ...message.data, vhost: "/" },
      });

      webviewPanel.dispose();
      await vscode.commands.executeCommand("rabbitmq.exchanges.refresh");
    }
  });

  const stylesheetPath = webviewPanel.webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, "dist/pages/new-exchange.css")
  );

  const scriptPath = webviewPanel.webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, "dist/pages/new-exchange.js")
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
