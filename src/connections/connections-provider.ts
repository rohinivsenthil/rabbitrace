import * as vscode from "vscode";
import { IDLE_CONNECTION } from "../constants";
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
      .filter(
        (connection): connection is Connection => connection !== undefined
      );
  }

  getTreeItem(connection: Connection): vscode.TreeItem {
    const item = new vscode.TreeItem(connection.name);
    item.description = connection.amqpURL;
    item.iconPath = IDLE_CONNECTION;
    return item;
  }

  refresh() {
    this._onDidChangeTreeData.fire();
  }
}
