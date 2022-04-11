import * as vscode from "vscode";
import { Axios } from "axios";
import { QUEUES } from "../constants";
import type Queue from "./queue";

export default async function deleteQueue(queue: Queue, managementAPI: Axios) {
  await managementAPI.request({
    method: "delete",
    url: `${QUEUES}/${queue.name}`,
    data: { name: queue.name, vhost: "/", mode: "delete" },
  });

  await vscode.commands.executeCommand("rabbitmq.queues.refresh");
}
