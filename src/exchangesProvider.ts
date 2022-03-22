import * as vscode from "vscode";
import axios from "axios";

export default class ExchangesProvider
  implements vscode.TreeDataProvider<vscode.TreeItem>
{
  async getChildren(): Promise<vscode.TreeItem[]> {
    const children: any = [];

    const res = await axios({
      method: "get",
      url: "http://localhost:15672/api/exchanges?page=1&page_size=50",
      auth: {
        username: "guest",
        password: "guest",
      },
    });

    res.data.items.map((exchange: any) => {
      const item = new vscode.TreeItem(
        exchange.name === "" ? "(AMQP default)" : `${exchange.name}`,
        vscode.TreeItemCollapsibleState.None
      );
      item.iconPath = new vscode.ThemeIcon(
        "remote",
        new vscode.ThemeColor("terminal.ansiBrightBlue")
      );
      children.push(item);
    });

    console.log(children);

    return children;
  }

  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }
}
