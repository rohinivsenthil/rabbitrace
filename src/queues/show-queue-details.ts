import * as path from "path";
import * as fs from "fs/promises";
import * as vscode from "vscode";
import Queue from "./queue";

export default async function showQueueDetails(
  context: vscode.ExtensionContext,
  queue: Queue
) {
  const panel = vscode.window.createWebviewPanel(
    "rabbitmq.queues.details",
    queue.name,
    vscode.ViewColumn.One,
    {}
  );

  panel.webview.html = (
    await fs.readFile(
      path.join(context.extensionPath, "webview", "queue-details.html")
    )
  ).toString();
}
