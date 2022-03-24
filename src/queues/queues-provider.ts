import * as vscode from "vscode";
import axios from "axios";
import { BASE_URL, LIST_QUEUES, QUEUE, AUTH } from "../constants";
import Queue from "./queue";

function queueToTreeItem(queue: Queue): vscode.TreeItem {
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

export default class QueuesProvider
  implements vscode.TreeDataProvider<vscode.TreeItem>
{
  async getChildren(): Promise<vscode.TreeItem[]> {
    const {
      data: { items },
    } = await axios({
      method: "get",
      url: `${BASE_URL}${LIST_QUEUES}`,
      auth: AUTH,
    });

    return items.map(queueToTreeItem);
  }

  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }
}
