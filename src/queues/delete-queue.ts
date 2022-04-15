import * as vscode from "vscode";
import { Axios } from "axios";
import type Queue from "./queue";

export default async function deleteQueue(queue: Queue, managementAPI: Axios) {
  try {
    await managementAPI.request({
      method: "delete",
      url: `/queues/%2F/${queue.name}`,
      data: { name: queue.name, vhost: "/", mode: "delete" },
    });
    vscode.window.showInformationMessage(
      `Rabbitrace: Successfully deleted queue: ${queue.name}`
    );
  } catch (e) {
    vscode.window.showInformationMessage(
      `Rabbitrace: Failed to delete queue: ${queue.name}`
    );
  }

  await vscode.commands.executeCommand("rabbitmq.queues.refresh");
}
