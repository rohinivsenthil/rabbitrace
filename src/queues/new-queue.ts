import * as vscode from "vscode";
import type Queue from "./queue";

export default async function newQueue(context: vscode.ExtensionContext) {
  const webviewPanel = vscode.window.createWebviewPanel(
    "rabbitmq.queues.new",
    "New Queue",
    vscode.ViewColumn.One,
    { enableScripts: true }
  );

  webviewPanel.webview.onDidReceiveMessage(async (queue: Queue) => {
    // TODO: write code to create queue (if successfully created call webviewPanel.dispose())
  });

  const stylesheetPath = webviewPanel.webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, "dist/pages/new-queue.css")
  );

  const scriptPath = webviewPanel.webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, "dist/pages/new-queue.js")
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
