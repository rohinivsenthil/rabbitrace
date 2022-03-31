// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import {
  ConnectionsProvider,
  newConnection,
  removeConnection,
} from "./connections";
import { ExchangeEditor, ExchangesProvider, newExchange } from "./exchanges";
import { QueueEditor, QueuesProvider } from "./queues";
import type { Connection } from "./connections";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "rabbitmq" is now active!');

  // Connections

  const connectionsProvider = new ConnectionsProvider(context);

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

  const exchangeEditor = new ExchangeEditor(context);
  const exchangesProvider = new ExchangesProvider();

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

  const queueEditor = new QueueEditor(context);
  const queuesProvider = new QueuesProvider();

  context.subscriptions.push(
    vscode.commands.registerCommand("rabbitmq.queues.refresh", () =>
      queuesProvider.refresh()
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
