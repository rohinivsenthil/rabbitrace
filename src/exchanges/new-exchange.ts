import * as vscode from "vscode";
import type Exchange from "./exchange";

export default async function newConnection(context: vscode.ExtensionContext) {
  const webviewPanel = vscode.window.createWebviewPanel(
    "rabbitmq.exchanges.new",
    "New Exchange",
    vscode.ViewColumn.One,
    { enableScripts: true }
  );

  webviewPanel.webview.onDidReceiveMessage(async (exchange: Exchange) => {
    // TODO: write code to create exchange (if successfully created call webviewPanel.dispose())
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
