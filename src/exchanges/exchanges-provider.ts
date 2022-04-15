import * as vscode from "vscode";
import { Axios } from "axios";
import { EXCHANGE } from "../constants";
import type Exchange from "./exchange";

export default class ExchangesProvider
  implements vscode.TreeDataProvider<Exchange | Error>, vscode.Disposable
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

  async getChildren(): Promise<(Exchange | Error)[]> {
    try {
      if (this.managementAPI.defaults.baseURL) {
        return (await this.managementAPI.get("/exchanges?page=1&page_size=50"))
          .data.items;
      }
    } catch (e) {
      return [new Error("Failed to get exchanges")];
    }

    return [];
  }

  getTreeItem(exchange: Exchange | Error): vscode.TreeItem {
    if (exchange instanceof Error) {
      const item = new vscode.TreeItem("");
      item.description = exchange.message;
      item.contextValue = "error";
      return item;
    }

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
