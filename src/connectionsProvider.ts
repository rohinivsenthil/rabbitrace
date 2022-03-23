import * as path from "path";
import * as fs from "fs/promises";
import * as vscode from "vscode";
import { CONNECTED_CONNECTION, IDLE_CONNECTION } from "./constants";

export default class ConnectionsProvider
  implements vscode.TreeDataProvider<vscode.TreeItem>
{
  context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }

  getChildren(): vscode.TreeItem[] {
    const item1 = new vscode.TreeItem(
      "localhost:15672",
      vscode.TreeItemCollapsibleState.None
    );
    item1.iconPath = IDLE_CONNECTION;

    const item2 = new vscode.TreeItem(
      "localhost:90991",
      vscode.TreeItemCollapsibleState.None
    );
    item2.iconPath = CONNECTED_CONNECTION;
    item2.tooltip = "Connected";

    return [item1, item2];
  }

  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }

  async newConnection() {
    const panel = vscode.window.createWebviewPanel(
      "rabbitmq.connections.new",
      "New Connection",
      vscode.ViewColumn.One,
      { enableScripts: true }
    );

    panel.webview.html = (
      await fs.readFile(
        path.join(this.context.extensionPath, "webview", "new-connection.html")
      )
    ).toString();
  }
}
