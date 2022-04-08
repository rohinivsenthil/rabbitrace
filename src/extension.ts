// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import axios from "axios";
import {
  ConnectionsProvider,
  newConnection,
  removeConnection,
} from "./connections";
import {
  ExchangeEditor,
  ExchangesProvider,
  newExchange,
  deleteExchange,
} from "./exchanges";
import { QueueEditor, QueuesProvider, newQueue, deleteQueue } from "./queues";
import type { Connection } from "./connections";
import type Exchange from "./exchanges/exchange";
import type Queue from "./queues/queue";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const managementAPI = axios.create();
  const connectionsProvider = new ConnectionsProvider(context);
  const exchangeEditor = new ExchangeEditor(context);
  const exchangesProvider = new ExchangesProvider(managementAPI);
  const queueEditor = new QueueEditor(context);
  const queuesProvider = new QueuesProvider(managementAPI);

  // Connections

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "rabbitmq.connect",
      (connectionName: string) => {
        const connection =
          context.workspaceState.get<Connection>(connectionName);

        connectionsProvider.connect(connectionName);

        managementAPI.defaults.baseURL = `${connection?.mapiURL}/api`;
        managementAPI.defaults.auth = connection
          ? {
              username: connection.mapiUsername,
              password: connection.mapiPassword,
            }
          : undefined;

        exchangesProvider.refresh();
        queuesProvider.refresh();
      }
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("rabbitmq.connections.new", () =>
      newConnection(context)
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "rabbitmq.connections.remove",
      (connection: Connection) => removeConnection(context, connection)
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("rabbitmq.connections.refresh", () =>
      connectionsProvider.refresh()
    )
  );

  context.subscriptions.push(
    vscode.window.registerTreeDataProvider(
      "rabbitmq.connections",
      connectionsProvider
    )
  );

  // Exchanges


  context.subscriptions.push(
    vscode.commands.registerCommand("rabbitmq.exchanges.new", () => {
      newExchange(context);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("rabbitmq.exchanges.refresh", () =>
      exchangesProvider.refresh()
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "rabbitmq.exchanges.delete",
      (exchange: Exchange) => {
        deleteExchange(exchange);
      }
    )
  );

  context.subscriptions.push(
    vscode.window.registerCustomEditorProvider(
      "rabbitmq.exchange",
      exchangeEditor,
      { supportsMultipleEditorsPerDocument: true }
    )
  );

  context.subscriptions.push(
    vscode.window.registerTreeDataProvider(
      "rabbitmq.exchanges",
      exchangesProvider
    )
  );

  context.subscriptions.push(exchangesProvider);

  // Queues

  context.subscriptions.push(
    vscode.commands.registerCommand("rabbitmq.queues.new", () => {
      newQueue(context);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("rabbitmq.queues.refresh", () =>
      queuesProvider.refresh()
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "rabbitmq.queues.delete",
      (queue: Queue) => {
        deleteQueue(queue);
      }
    )
  );

  context.subscriptions.push(
    vscode.window.registerCustomEditorProvider("rabbitmq.queue", queueEditor, {
      supportsMultipleEditorsPerDocument: true,
    })
  );

  context.subscriptions.push(
    vscode.window.registerTreeDataProvider("rabbitmq.queues", queuesProvider)
  );

  context.subscriptions.push(queuesProvider);
}

// this method is called when your extension is deactivated
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate() {}
