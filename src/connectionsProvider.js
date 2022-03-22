const vscode = require('vscode');

class ConnectionsProvider {
    constructor() {
    }

    getChildren(element) {
        if (element === undefined) {
            
            const item = new vscode.TreeItem("localhost:15672", vscode.TreeItemCollapsibleState.None)
            item.iconPath = new vscode.ThemeIcon("plug");

            const item1 = new vscode.TreeItem("localhost:90991", vscode.TreeItemCollapsibleState.None)
            item1.iconPath = new vscode.ThemeIcon("debug-disconnect", new vscode.ThemeColor("terminal.ansiBrightGreen"));
            item1.tooltip = "Connected"

            return [item, item1];
            
        }
    }

    getTreeItem(element) {
        return element;
    }
}

module.exports = ConnectionsProvider