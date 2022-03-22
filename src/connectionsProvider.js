const vscode = require('vscode');

class ConnectionsProvider {
    constructor() {
    }

    getChildren(element) {
        if (element === undefined) {
            return [
                new vscode.TreeItem("abc", vscode.TreeItemCollapsibleState.None),
            ];
        }
    }

    getTreeItem(element) {
        return element;
    }
}

module.exports = ConnectionsProvider