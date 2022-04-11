import * as vscode from "vscode";
import { Axios } from "axios";
import { EXCHANGES } from "../constants";
import type Exchange from "./exchange";

export default async function deleteExchange(
  exchange: Exchange,
  managementAPI: Axios
) {
  await managementAPI.request({
    method: "delete",
    url: `${EXCHANGES}/${exchange.name}`,
    data: { name: exchange.name, vhost: "/" },
  });

  await vscode.commands.executeCommand("rabbitmq.exchanges.refresh");
}
