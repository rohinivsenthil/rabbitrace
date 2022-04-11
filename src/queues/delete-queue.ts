import * as vscode from "vscode";
import { Axios } from "axios";
import type Queue from "./queue";

export default async function deleteQueue(queue: Queue, managementAPI: Axios) {
  await managementAPI.request({
    method: "delete",
    url: `/queues/%2F"/${queue.name}`,
    data: { name: queue.name, vhost: "/", mode: "delete" },
  });

  await vscode.commands.executeCommand("rabbitmq.queues.refresh");
}
