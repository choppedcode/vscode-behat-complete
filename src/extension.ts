'use strict';

import * as vscode from 'vscode';

import child = require('child_process');

var completionItemsCache = [];

export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => {
		completionItemsCache = [];
	}));

	var autocompleteDisposable = vscode.languages.registerCompletionItemProvider('feature', {
		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token) {
			const keywords = ['Given', 'When', 'Then', 'But', 'And'];

			// Check line starts with Gherkin keyword
			let linePrefix = document.lineAt(position).text.substr(0, position.character);
			var found = false;
			for (var i in keywords) {
				if (!linePrefix.startsWith(keywords[i])) {
					found = true;
				}
			}
			if (!found) return undefined;

			if (completionItemsCache.length == 0) {
				// Prepare Behat command to retrieve definitions
				var path = vscode.workspace.getConfiguration().get('behat.command');
				var config = vscode.workspace.getConfiguration().get('behat.configFile');
				var suite = vscode.workspace.getConfiguration().get('behat.suite');
				var command = path + " -c '" + config + "' -di";
				if (suite.toString().length > 0) command += " --suite=" + suite;
				var command = command.replace('[WSROOT]', vscode.workspace.rootPath);

				// Run Behat command and retrieve definitions
				var serverterminal = child.execSync(command);
				var result = serverterminal.toString();
				var lines = result.split('\n');

				// Parse definitions
				var line = 1;
				var data = { string: '', help: [] };
				lines.forEach(function (value) {
					value = value.trim();
					if (value.length > 0) {
						var temp = value.split('|');
						var type = temp.shift();
						var cleanString = temp.join('|').trim();
						if (line == 1) {
							for (var i in keywords) {
								cleanString = cleanString.replace('[' + keywords[i] + '|*]', '').trim();
							}
							cleanString = cleanString.replace(/:arg[0-9]+/g, '""');
							data = { string: cleanString, help: [] };
						} else {
							data.help.push(cleanString);
						}
						line++;
					} else {
						line = 1;
						const completionItem = new vscode.CompletionItem(data.string, vscode.CompletionItemKind.Text);
						if (data.help.length > 1) {
							data.help.pop();
							completionItem.documentation = data.help.join('\n');
						}
						completionItemsCache.push(completionItem);
					}
				});
				vscode.window.showInformationMessage(completionItemsCache.length + " definitions loaded");

			}

			return completionItemsCache;
		}
	});

	context.subscriptions.push(autocompleteDisposable);
}
