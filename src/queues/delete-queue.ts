import * as vscode from "vscode";
import { Axios } from "axios";
import type Queue from "./queue";

export default async function deleteQueue(queue: Queue, managementAPI: Axios) {
  try {
    console.log(queue.name);
    await managementAPI.request({
      method: "delete",
      url: `/queues/%2F/${queue.name}`,
      data: { name: queue.name, vhost: "/", mode: "delete" },
    });
    vscode.window.showInformationMessage(
      `Successfully deleted queue: ${queue.name}`
    );
  } catch (e) {
    `Failed to delete queue: ${queue.name}`;
  }

  await vscode.commands.executeCommand("rabbitmq.queues.refresh");
}
