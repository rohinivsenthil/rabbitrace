import * as vscode from "vscode";
import axios from "axios";
import { BASE_URL, QUEUES, AUTH } from "../constants";
import type Queue from "./queue";

export default async function deleteQueue(queue: Queue) {
  await axios({
    method: "delete",
    baseURL: BASE_URL,
    url: `${QUEUES}/${queue.name}`,
    auth: AUTH,
    data: { name: queue.name, vhost: "/", mode: "delete" },
  });

  await vscode.commands.executeCommand("rabbitmq.queues.refresh");
}
