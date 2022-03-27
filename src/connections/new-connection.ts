import * as path from "path";
import * as fs from "fs/promises";
import * as vscode from "vscode";
import type Connection from "./connection";

interface NewConnectionMessage {
  action: string;
  connection: Connection;
}

export default async function newConnection(context: vscode.ExtensionContext) {
  const panel = vscode.window.createWebviewPanel(
    "rabbitmq.connections.new",
    "New Connection",
    vscode.ViewColumn.One,
    { enableScripts: true }
  );

  panel.webview.onDidReceiveMessage(async (message: NewConnectionMessage) => {
    switch (message.action) {
      case "save-connection":
        panel.dispose();
        await context.workspaceState.update(
          message.connection.name,
          message.connection
        );
        await vscode.commands.executeCommand("rabbitmq.connections.refresh");
        break;
      case "test-connection":
        break;
    }
  });

  panel.webview.html = (
    await fs.readFile(
      path.join(context.extensionPath, "webview", "new-connection.html")
    )
  ).toString();
}
