import * as vscode from "vscode";
import axios from "axios";
import { BASE_URL, LIST_EXCHANEGS, EXCHANGE, AUTH } from "../constants";
import Exchange from "./exchange";

function exchangeToTreeItem(exchange: Exchange): vscode.TreeItem {
  const item = new vscode.TreeItem(
    exchange.name || "(AMQP default)",
    vscode.TreeItemCollapsibleState.None
  );

  item.iconPath = EXCHANGE;

  item.command = {
    arguments: [exchange],
    command: "rabbitmq.exchanges.details",
    title: "Exchange Details",
  };

  return item;
}

export default class ExchangesProvider
  implements vscode.TreeDataProvider<vscode.TreeItem>
{
  async getChildren(): Promise<vscode.TreeItem[]> {
    const {
      data: { items },
    } = await axios({
      method: "get",
      url: `${BASE_URL}${LIST_EXCHANEGS}`,
      auth: AUTH,
    });

    return items.map(exchangeToTreeItem);
  }

  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }
}
