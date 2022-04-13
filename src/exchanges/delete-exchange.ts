import * as vscode from "vscode";
import { Axios } from "axios";
import type Exchange from "./exchange";

export default async function deleteExchange(
  exchange: Exchange,
  managementAPI: Axios
) {
  try {
    await managementAPI.request({
      method: "delete",
      url: `/exchanges/%2F/${exchange.name}`,
      data: { name: exchange.name, vhost: "/" },
    });
    vscode.window.showInformationMessage(
      `Successfully deleted exchange: ${exchange.name}`
    );
  } catch (e) {
    vscode.window.showErrorMessage(
      `Failed to delete exchange: ${exchange.name}`
    );
  }

  await vscode.commands.executeCommand("rabbitmq.exchanges.refresh");
}
