import * as vscode from "vscode";
import axios from "axios";
import { BASE_URL, EXCHANGES, AUTH } from "../constants";
import type Exchange from "./exchange";

export default async function deleteExchange(exchange: Exchange) {
  await axios({
    method: "delete",
    baseURL: BASE_URL,
    url: `${EXCHANGES}/${exchange.name}`,
    auth: AUTH,
    data: { name: exchange.name, vhost: "/" },
  });

  await vscode.commands.executeCommand("rabbitmq.exchanges.refresh");
}
