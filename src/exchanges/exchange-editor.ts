import * as path from "path";
import * as fs from "fs/promises";
import * as vscode from "vscode";

export default class ExchangeEditor
  implements vscode.CustomReadonlyEditorProvider
{
  context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }

  openCustomDocument(uri: vscode.Uri): vscode.CustomDocument {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return { uri, dispose: () => {} };
  }

  async resolveCustomEditor(
    document: vscode.CustomDocument,
    webviewPanel: vscode.WebviewPanel
  ): Promise<void> {
    webviewPanel.title = document.uri.fragment;

    webviewPanel.webview.options = {
      enableScripts: true,
    };

    webviewPanel.webview.html = (
      await fs.readFile(
        path.join(
          this.context.extensionPath,
          "webview",
          "exchange-details.html"
        ),
        "utf-8"
      )
    ).replace(
      "codicon.css",
      webviewPanel.webview
        .asWebviewUri(
          vscode.Uri.joinPath(
            this.context.extensionUri,
            "node_modules/@vscode/codicons/dist/codicon.css"
          )
        )
        .toString()
    );
  }
}
