// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { TextEncoder } from 'util';
import * as vscode from 'vscode';
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

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let nixShell = vscode.commands.registerCommand('holochainer.nix', () => {
		terminal().sendText("nix-shell .");
	});
	let createDefNix = vscode.commands.registerCommand("holochainer.defaultNix", () => {
		const wsedit = new vscode.WorkspaceEdit();
		if(vscode.workspace.workspaceFolders == undefined){
			vscode.window.showInformationMessage('Open a workspace to create the default nix file');
			return;
		}

		const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath; // gets the path of the first workspace folder
		const filePath = vscode.Uri.file(wsPath + '/default.nix');
	
		wsedit.createFile(filePath, { ignoreIfExists: true });
		var encoder = new TextEncoder()
		vscode.workspace.fs.writeFile(filePath,encoder.encode(defaultNixFileContent));
		
		
		vscode.workspace.applyEdit(wsedit);
		vscode.window.showInformationMessage('Created a new file: default.nix');
		
	});
	context.subscriptions.push(nixShell);
	context.subscriptions.push(createDefNix);
}
// this method is called when your extension is deactivated
export function deactivate() { }
//Replace this with a file if I find a way to target the src files.

let defaultNixFileContent = `let
holonixPath = builtins.fetchTarball {
  url = "https://github.com/holochain/holonix/archive/90a19d5771c069dbcc9b27938009486b54b12fb7.tar.gz";
  sha256 = "11wv7mwliqj38jh1gda3gd0ad0vqz1d42hxnhjmqdp037gcd2cjg";
};
holonix = import (holonixPath) {
  includeHolochainBinaries = true;
  holochainVersionId = "custom";

  holochainVersion = {
   rev = "d3a61446acaa64b1732bc0ead5880fbc5f8e3f31";
   sha256 = "0k1fsxg60spx65hhxqa99nkiz34w3qw2q4wspzik1vwpkhk4pwqv";
   cargoSha256 = "0fz7ymyk7g3jk4lv1zh6gbn00ad7wsyma5r7csa88myl5xd14y68";
   bins = {
	 holochain = "holochain";
	 hc = "hc";
   };
  };
};
in holonix.main`