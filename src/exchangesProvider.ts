import * as vscode from "vscode";
import axios from "axios";

interface Exchange {
  name: string;
}

export default class ExchangesProvider
  implements vscode.TreeDataProvider<vscode.TreeItem>
{
  async getChildren(): Promise<vscode.TreeItem[]> {
    const { data } = await axios({
      method: "get",
      url: "http://localhost:15672/api/exchanges?page=1&page_size=50",
      auth: {
        username: "guest",
        password: "guest",
      },
    });

    const children = data.items.map((exchange: Exchange) => {
      const item = new vscode.TreeItem(
        exchange.name === "" ? "(AMQP default)" : `${exchange.name}`,
        vscode.TreeItemCollapsibleState.None
      );

      item.iconPath = new vscode.ThemeIcon(
        "remote",
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
