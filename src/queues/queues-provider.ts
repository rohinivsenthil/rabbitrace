import * as vscode from "vscode";
import axios from "axios";
import { BASE_URL, LIST_QUEUES, QUEUE, AUTH } from "../constants";
import Queue from "./queue";

export default class QueuesProvider implements vscode.TreeDataProvider<Queue> {
  private _onDidChangeTreeData: vscode.EventEmitter<
    Queue | undefined | null | void
  > = new vscode.EventEmitter<Queue | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<Queue | undefined | null | void> =
    this._onDidChangeTreeData.event;

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
      arguments: [queue],
      command: "rabbitmq.queues.details",
      title: "Queue Details",
    };

    return item;
  }

  refresh() {
    this._onDidChangeTreeData.fire();
  }
}
