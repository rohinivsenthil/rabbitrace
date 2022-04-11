import * as vscode from "vscode";
import { CONNECTED_CONNECTION, IDLE_CONNECTION } from "../constants";
import type Connection from "./connection";

export default class ConnectionsProvider
  implements vscode.TreeDataProvider<Connection>
{
  private _onDidChangeTreeData: vscode.EventEmitter<
    Connection | undefined | null | void
  > = new vscode.EventEmitter<Connection | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<
    Connection | undefined | null | void
  > = this._onDidChangeTreeData.event;

  context: vscode.ExtensionContext;
  connected?: string;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    this.refresh();
  }

  getChildren(): Connection[] {
    return this.context.workspaceState
      .keys()
      .map((connectionName) =>
        this.context.workspaceState.get<Connection>(connectionName)
      )
      .filter((connection): connection is Connection => !!connection);
  }

  getTreeItem(connection: Connection): vscode.TreeItem {
    const item = new vscode.TreeItem(connection.name);

    item.description = connection.amqpURL;

    item.iconPath =
      connection.name == this.connected
        ? CONNECTED_CONNECTION
        : IDLE_CONNECTION;

    item.command = {
      arguments: [connection.name],
      command: "rabbitmq.connect",
      title: "Connect",
    };

    return item;
  }

  refresh() {
    this._onDidChangeTreeData.fire();
  }

  connect(connectionName: string) {
    this.connected = connectionName;
    this.refresh();
  }
}
