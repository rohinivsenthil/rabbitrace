import * as vscode from "vscode";

// endpoints

const BASE_URL = "http://localhost:15672/api";
const EXCHANGES = "/exchanges/%2F";
const QUEUES = "/queues/%2F";
const LIST_BINDINGS_EXCHANGE = "/bindings/source";
const LIST_BINDINGS_QUEUE = "/bindings";
const LIST_EXCHANEGS = "/exchanges?page=1&page_size=50";
const LIST_QUEUES = "/queues?page=1&page_size=50";
const VHOST = "/%2F";

const AUTH = {
  username: "guest",
  password: "guest",
};

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

export {
  EXCHANGE,
  EXCHANGES,
  LIST_BINDINGS_EXCHANGE,
  QUEUE,
  QUEUES,
  CONNECTED_CONNECTION,
  IDLE_CONNECTION,
  BASE_URL,
  LIST_EXCHANEGS,
  LIST_QUEUES,
  AUTH,
  REFRESH_TIME,
  LIST_BINDINGS_QUEUE,
  VHOST,
};
