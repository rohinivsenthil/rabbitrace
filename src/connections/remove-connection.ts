import * as vscode from "vscode";
import type Connection from "./connection";

export default async function removeConnection(
  context: vscode.ExtensionContext,
  connection: Connection
) {
  await context.workspaceState.update(connection.name, undefined);
  await vscode.commands.executeCommand("rabbitmq.connections.refresh");
}
