// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { TextEncoder } from 'util';
import * as vscode from 'vscode';
import container from './dependencyInjection/diContainer';
import TYPES from './dependencyInjection/types';
import { Holochainer } from './services/holochainerService';
const terminal = (show: boolean = true): vscode.Terminal => {
	let terminal = vscode.window.activeTerminal == null ? vscode.window.createTerminal() : vscode.window.activeTerminal;

	if (show)
		terminal.show();

	return terminal;
}
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "holochainer" is now active!');

	try {
		const holochainer = container.get<Holochainer>(TYPES.Holochainer);
		holochainer.registerCommands(context);
	} catch (err) {
		vscode.window.showErrorMessage('Failed to instantiate holochainer plugin');
		
	}
}
export function deactivate() { }
