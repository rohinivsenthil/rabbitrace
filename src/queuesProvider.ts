import * as vscode from "vscode";
import axios from "axios";
import { BASE_URL, LIST_QUEUES, QUEUE, AUTH } from "./constants";

interface Queue {
  name: string;
}

export default class QueuesProvider
  implements vscode.TreeDataProvider<vscode.TreeItem>
{
  async getChildren(): Promise<vscode.TreeItem[]> {
    const { data } = await axios({
      method: "get",
      url: `${BASE_URL}${LIST_QUEUES}`,
      auth: AUTH,
    });

    const children = data.items.map((queue: Queue) => {
      const item = new vscode.TreeItem(
        `${queue.name}`,
        vscode.TreeItemCollapsibleState.None
      );
      item.iconPath = QUEUE;
      return item;
    });

    return children;
  }

  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }
}
