import * as vscode from "vscode";

// endpoints

const BASE_URL = "http://localhost:15672";
const LIST_EXCHANEGS = "/api/exchanges?page=1&page_size=50";
const LIST_QUEUES = "/api/queues?page=1&page_size=50";

const AUTH = {
  username: "guest",
  password: "guest",
};

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

const IDLE_CONNECTION = new vscode.ThemeIcon(
  "debug-disconnect",
  new vscode.ThemeIcon("plug")
);

export {
  EXCHANGE,
  QUEUE,
  CONNECTED_CONNECTION,
  IDLE_CONNECTION,
  BASE_URL,
  LIST_EXCHANEGS,
  LIST_QUEUES,
  AUTH,
};
