// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const child = require('child_process');

const completionItemsCache = [];

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    var autocompleteDisposable = vscode.languages.registerCompletionItemProvider('feature', {
        provideCompletionItems(document, position, token) {
            var start = new vscode.Position(position.line, 0);
            var range = new vscode.Range(start, position);
            var text = document.getText(range)
                .replace('Given', '')
                .replace('When', '')
                .replace('Then', '')
                .replace('But', '')
                .replace('And', '')
                .trim();

            var workspaceRoot = vscode.workspace.rootPath;
            // var path = context.asAbsolutePath('parser.php');
            var path = workspaceRoot + '/vendor/bin/behat';
            var config = workspaceRoot + '/tests/behat.yml';

            // let serverterminal = child.spawnSync('php', [path, workspaceRoot, text], {
            //     cwd: vscode.workspace.rootPath
            // });
            let serverterminal = child.spawnSync('php', [path, '-dl', '-c', config], {
                cwd: vscode.workspace.rootPath
            });

            var result = serverterminal.stdout.toString();
            var lines = result.split('\n');

            if (completionItemsCache.length == 0) {
                lines.forEach(function (value) {
                    var cleanString = value.split('|').pop();
                    cleanString = cleanString
                        .replace('Given', '')
                        .replace('When', '')
                        .replace('Then', '')
                        .replace('But', '')
                        .replace('And', '')
                        .trim();
                    var completionItem = new vscode.CompletionItem(cleanString);
                    completionItemsCache.push(completionItem);
                });
            }

            return completionItemsCache;
        }
    });

    context.subscriptions.push(autocompleteDisposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;