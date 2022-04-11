import * as vscode from "vscode";
import { Axios } from "axios";

export default async function newQueue(
  context: vscode.ExtensionContext,
  managementAPI: Axios
) {
  const webviewPanel = vscode.window.createWebviewPanel(
    "rabbitmq.queues.new",
    "New Queue",
    vscode.ViewColumn.One,
    { enableScripts: true }
  );

  webviewPanel.webview.onDidReceiveMessage(async (message) => {
    if (message.type === "new-queue") {
      console.log(message.name);
      await managementAPI.request({
        method: "put",
        url: `/queues/%2F/${message.data.name}`,
        data: { ...message.data, vhost: "/" },
      });

      webviewPanel.dispose();
      await vscode.commands.executeCommand("rabbitmq.queues.refresh");
    }
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
