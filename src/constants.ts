import * as vscode from "vscode";

const REFRESH_TIME = 5000;

// icons

const EXCHANGE = new vscode.ThemeIcon(
  "remote",
  new vscode.ThemeColor("terminal.ansiBrightCyan")
);

const QUEUE = new vscode.ThemeIcon(
  "database",
  new vscode.ThemeColor("terminal.ansiBrightBlue")
);

const CONNECTED_CONNECTION = new vscode.ThemeIcon(
  "debug-disconnect",
  new vscode.ThemeColor("terminal.ansiBrightGreen")
);

const IDLE_CONNECTION = new vscode.ThemeIcon("plug");

export { EXCHANGE, QUEUE, CONNECTED_CONNECTION, IDLE_CONNECTION, REFRESH_TIME };
