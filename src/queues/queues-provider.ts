import * as vscode from "vscode";
import axios from "axios";
import { BASE_URL, LIST_QUEUES, QUEUE, AUTH } from "../constants";
import Queue from "./queue";

export default class QueuesProvider
  implements vscode.TreeDataProvider<Queue>, vscode.Disposable
{
  private _onDidChangeTreeData: vscode.EventEmitter<
    Queue | undefined | null | void
  > = new vscode.EventEmitter<Queue | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<Queue | undefined | null | void> =
    this._onDidChangeTreeData.event;

  refreshInterval: NodeJS.Timeout;

  constructor() {
    this.refreshInterval = setInterval(() => this.refresh(), 5000);
  }

  async getChildren(): Promise<Queue[]> {
    const {
      data: { items },
    } = await axios({
      method: "get",
      url: `${BASE_URL}${LIST_QUEUES}`,
      auth: AUTH,
    });

    return items;
  }

  getTreeItem(queue: Queue): vscode.TreeItem {
    const item = new vscode.TreeItem(
      `${queue.name}`,
      vscode.TreeItemCollapsibleState.None
    );

    item.iconPath = QUEUE;

    item.command = {
      arguments: [
        vscode.Uri.from({
          scheme: "rabbitmq-queue",
          fragment: BASE_URL,
          path: queue.name,
        }),
        "rabbitmq.queue",
        vscode.ViewColumn.Active,
      ],
      command: "vscode.openWith",
      title: "Queue Details",
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
