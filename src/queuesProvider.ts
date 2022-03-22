import * as vscode from "vscode";
import axios from "axios";

interface Queue {
  name: string;
}

export default class QueuesProvider
  implements vscode.TreeDataProvider<vscode.TreeItem>
{
  async getChildren(): Promise<vscode.TreeItem[]> {
    const { data } = await axios({
      method: "get",
      url: "http://localhost:15672/api/queues?page=1&page_size=50",
      auth: {
        username: "guest",
        password: "guest",
      },
    });

    const children = data.items.map((queue: Queue) => {
      const item = new vscode.TreeItem(
        `${queue.name}`,
        vscode.TreeItemCollapsibleState.None
      );

      item.iconPath = new vscode.ThemeIcon(
        "database",
        new vscode.ThemeColor("terminal.ansiBrightBlue")
      );

      return item;
    });

    return children;
  }

  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }
}
