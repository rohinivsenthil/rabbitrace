import * as vscode from "vscode";
import { CONNECTED_CONNECTION, IDLE_CONNECTION } from "./constants";

export default class ConnectionsProvider
  implements vscode.TreeDataProvider<vscode.TreeItem>
{
  getChildren(): vscode.TreeItem[] {
    const item1 = new vscode.TreeItem(
      "localhost:15672",
      vscode.TreeItemCollapsibleState.None
    );
    item1.iconPath = IDLE_CONNECTION;

    const item2 = new vscode.TreeItem(
      "localhost:90991",
      vscode.TreeItemCollapsibleState.None
    );
    item2.iconPath = CONNECTED_CONNECTION;
    item2.tooltip = "Connected";

    return [item1, item2];
  }

  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }

  newConnection() {
    const panel = vscode.window.createWebviewPanel(
      "rabbitmq.newConnectionTab",
      "New Connection",
      vscode.ViewColumn.One,
      {}
    );

    panel.webview.html = getNewConnectionWebview();
  }
}

function getNewConnectionWebview() {
  return `
  <!DOCTYPE html>
  <html>
    <head>
    <style>
      .connection-container {
        margin: 50px;
        width: 50%;
      }
      .connection-header {
        text-decoration-line: underline;
        margin: 10px 0 50px 0;
      }
      .connection-entry {
        margin: 20px 0 10px 0;
        display: flex;
        justify-content: space-between;
      }
      .connection-input {
        margin-left: 10px;
      }
      .connection-action-btns {
        margin-top: 50px;
      }
      .connection-btn {
        margin-right: 10px;
      }
    </style>
    </head>
    <body>
      <div class="connection-container">
        <div>
          <h1 class="connection-header">Add a new connection</h1>
        </div>
        <div class="connection-entry">
          <label for="connection-name">Connection name:</label>
          <input type="text" id="connection-name" class="connection-input">
        </div>
        <div class="connection-entry">
          <label for="amqp-url">AMQP URL:</label>
          <input type="text" id="amqp-url" class="connection-input">
        </div>
        <div class="connection-entry">
          <label for="mapi-url">Management API URL:</label>
          <input type="text" id="mapi-url" class="connection-input">
        </div>
        <div class="connection-entry">
          <label for="mapi-username">Management API Username:</label>
          <input type="text" id="mapi-username" class="connection-input">
        </div>
        <div class="connection-entry">
          <label for="mapi-password">Management API Password:</label>
          <input type="text" id="mapi-password" class="connection-input">
        </div>
        <div class="connection-action-btns"> 
          <button type="button" class="connection-btn">Test Connection</button>
          <button type="button" class="connection-btn">Save Connection</button>
        </div>
      </div>
    </body>
  </html>
  `;
}
