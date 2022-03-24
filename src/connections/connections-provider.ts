import * as path from "path";
import * as fs from "fs/promises";
import * as vscode from "vscode";
import { IDLE_CONNECTION } from "../constants";

interface Connection {
  name: string;
  amqpURL: string;
  mapiURL: string;
  mapiUsername: string;
  mapiPassword: string;
}

interface NewConnectionMessage {
  action: string;
  connection: Connection;
}

export default class ConnectionsProvider
  implements vscode.TreeDataProvider<vscode.TreeItem>
{
  private _onDidChangeTreeData: vscode.EventEmitter<
    vscode.TreeItem | undefined | null | void
  > = new vscode.EventEmitter<vscode.TreeItem | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<
    vscode.TreeItem | undefined | null | void
  > = this._onDidChangeTreeData.event;

  context: vscode.ExtensionContext;
  connections: vscode.TreeItem[];

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    this.connections = [];
    this.refresh();
  }

  getChildren(): vscode.TreeItem[] {
    return this.connections;
  }

  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }

  async newConnection() {
    const panel = vscode.window.createWebviewPanel(
      "rabbitmq.connections.new",
      "New Connection",
      vscode.ViewColumn.One,
      { enableScripts: true }
    );

    panel.webview.onDidReceiveMessage(async (message: NewConnectionMessage) => {
      switch (message.action) {
        case "save-connection":
          panel.dispose();
          await this.context.workspaceState.update(
            message.connection.name,
            message.connection
          );
          this.refresh();
          break;
        case "test-connection":
          break;
      }
    });

    panel.webview.html = (
      await fs.readFile(
        path.join(this.context.extensionPath, "webview", "new-connection.html")
      )
    ).toString();
  }

  refresh() {
    this.connections = this.context.workspaceState
      .keys()
      .map((connectionName) => {
        const connectionDetails =
          this.context.workspaceState.get<Connection>(connectionName);
        const item = new vscode.TreeItem(
          connectionName,
          vscode.TreeItemCollapsibleState.None
        );
        item.iconPath = IDLE_CONNECTION;
        item.description = connectionDetails?.amqpURL;
        return item;
      });
    this._onDidChangeTreeData.fire();
  }
}
