import * as vscode from "vscode";

export default class ConnectionsProvider
  implements vscode.TreeDataProvider<vscode.TreeItem>
{
  getChildren(): vscode.TreeItem[] {
    const item1 = new vscode.TreeItem(
      "localhost:15672",
      vscode.TreeItemCollapsibleState.None
    );
    item1.iconPath = new vscode.ThemeIcon("plug");

    const item2 = new vscode.TreeItem(
      "localhost:90991",
      vscode.TreeItemCollapsibleState.None
    );
    item2.iconPath = new vscode.ThemeIcon(
      "debug-disconnect",
      new vscode.ThemeColor("terminal.ansiBrightGreen")
    );
    item2.tooltip = "Connected";

    return [item1, item2];
  }

  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }
}
