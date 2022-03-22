import * as vscode from "vscode";
import axios from "axios";
import { BASE_URL, LIST_EXCHANEGS, EXCHANGE, AUTH } from "./constants";

interface Exchange {
  name: string;
}

export default class ExchangesProvider
  implements vscode.TreeDataProvider<vscode.TreeItem>
{
  async getChildren(): Promise<vscode.TreeItem[]> {
    const { data } = await axios({
      method: "get",
      url: `${BASE_URL}${LIST_EXCHANEGS}`,
      auth: AUTH,
    });

    const children = data.items.map((exchange: Exchange) => {
      const item = new vscode.TreeItem(
        exchange.name === "" ? "(AMQP default)" : `${exchange.name}`,
        vscode.TreeItemCollapsibleState.None
      );
      item.iconPath = EXCHANGE;
      return item;
    });

    return children;
  }

  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }
}
