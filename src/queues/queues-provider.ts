import * as vscode from "vscode";
import axios from "axios";
import { BASE_URL, LIST_QUEUES, QUEUE, AUTH } from "../constants";
import Queue from "./queue";

export default class QueuesProvider implements vscode.TreeDataProvider<Queue> {
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
}
