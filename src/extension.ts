// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import ConnectionsProvider from "./connectionsProvider";
import { ExchangesProvider, viewExchangeDetails } from "./exchanges";
import Exchange from "./exchanges/exchange";
import QueuesProvider from "./queuesProvider";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "rabbitmq" is now active!');

  const connectionsProvider = new ConnectionsProvider(context);
  const exchangesProvider = new ExchangesProvider();
  const queuesProvider = new QueuesProvider();

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "rabbitmq.connections.new",
      connectionsProvider.newConnection.bind(connectionsProvider)
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "rabbitmq.exchanges.details",
      (exchange: Exchange) => viewExchangeDetails(context, exchange),
    )
  )

  context.subscriptions.push(
    vscode.window.registerTreeDataProvider(
      "rabbitmq.connections",
      connectionsProvider
    )
  );

  context.subscriptions.push(
    vscode.window.registerTreeDataProvider(
      "rabbitmq.exchanges",
      exchangesProvider
    )
  );

  context.subscriptions.push(
    vscode.window.registerTreeDataProvider("rabbitmq.queues", queuesProvider)
  );
}

// this method is called when your extension is deactivated
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate() {}
