import * as vscode from "vscode";
import axios from "axios";
import { BASE_URL, QUEUES, AUTH } from "../constants";

export default async function newQueue(context: vscode.ExtensionContext) {
  const webviewPanel = vscode.window.createWebviewPanel(
    "rabbitmq.queues.new",
    "New Queue",
    vscode.ViewColumn.One,
    { enableScripts: true }
  );

  webviewPanel.webview.onDidReceiveMessage(async (message) => {
    if (message.type === "new-queue") {
      console.log(message.name);
      await axios({
        method: "put",
        baseURL: BASE_URL,
        url: `${QUEUES}/${message.data.name}`,
        auth: AUTH,
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
