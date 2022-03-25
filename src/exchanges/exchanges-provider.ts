import * as vscode from "vscode";
import axios from "axios";
import { BASE_URL, LIST_EXCHANEGS, EXCHANGE, AUTH } from "../constants";
import Exchange from "./exchange";

export default class ExchangesProvider
  implements vscode.TreeDataProvider<Exchange>, vscode.Disposable
{
  private _onDidChangeTreeData: vscode.EventEmitter<
    Exchange | undefined | null | void
  > = new vscode.EventEmitter<Exchange | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<
    Exchange | undefined | null | void
  > = this._onDidChangeTreeData.event;

  refreshInterval: NodeJS.Timeout

  constructor() {
    this.refreshInterval = setInterval(() => this.refresh(), 5000);
  }


  async getChildren(): Promise<Exchange[]> {
    const {
      data: { items },
    } = await axios({
      method: "get",
      url: `${BASE_URL}${LIST_EXCHANEGS}`,
      auth: AUTH,
    });

    return items;
  }

  getTreeItem(exchange: Exchange): vscode.TreeItem {
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

  refresh() {
    this._onDidChangeTreeData.fire();
  }

  dispose() {
    clearInterval(this.refreshInterval);
  }
}
