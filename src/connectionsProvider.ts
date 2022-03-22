import * as vscode from "vscode";
import { CONNECTED_CONNECTION, IDLE_CONNECTION } from "./constants";

export default class ConnectionsProvider
  implements vscode.TreeDataProvider<vscode.TreeItem>
{
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
}
