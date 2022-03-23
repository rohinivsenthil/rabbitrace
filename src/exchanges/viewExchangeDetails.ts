import * as path from "path";
import * as fs from "fs/promises";
import * as vscode from "vscode";
import Exchange from "./exchange";

export default async function viewExchangeDetails(context: vscode.ExtensionContext, exchange: Exchange) {
    const panel = vscode.window.createWebviewPanel(
      "rabbitmq.exchanges.details",
      exchange.name,
      vscode.ViewColumn.One,
      {}
    );

    panel.webview.html = (
      await fs.readFile(
        path.join(context.extensionPath, "webview", "exchange-details.html")
      )
    ).toString();
}