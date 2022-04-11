import * as vscode from "vscode";
import { Axios } from "axios";
import { EXCHANGE } from "../constants";
import type Exchange from "./exchange";

export default class ExchangesProvider
  implements vscode.TreeDataProvider<Exchange>, vscode.Disposable
{
  private _onDidChangeTreeData: vscode.EventEmitter<
    Exchange | undefined | null | void
  > = new vscode.EventEmitter<Exchange | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<
    Exchange | undefined | null | void
  > = this._onDidChangeTreeData.event;

  refreshInterval: NodeJS.Timeout;
  managementAPI: Axios;

  constructor(managementAPI: Axios) {
    this.refreshInterval = setInterval(() => this.refresh(), 5000);
    this.managementAPI = managementAPI;
  }

  async getChildren(): Promise<Exchange[]> {
    if (this.managementAPI.defaults.baseURL) {
      return (await this.managementAPI.get("/exchanges?page=1&page_size=50"))
        .data.items;
    }
    return [];
  }

  getTreeItem(exchange: Exchange): vscode.TreeItem {
    const item = new vscode.TreeItem(exchange.name || "(AMQP default)");

    item.iconPath = EXCHANGE;

    item.command = {
      arguments: [
        vscode.Uri.from({
          scheme: "rabbitmq-exchange",
          path: exchange.name,
        }),
        "rabbitmq.exchange",
        vscode.ViewColumn.Active,
      ],
      command: "vscode.openWith",
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
