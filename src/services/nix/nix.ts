import { getActiveTerminal } from "../shared/helpers";
import { ICommand } from "../shared/ICommand";
import * as vscode from 'vscode';
import { TextEncoder } from 'util';
export class enterNix implements ICommand {
    name = "holochainer.nix";
    execute = async () => {
      
        getActiveTerminal().sendText("nix-shell .");
    }
}


export class createDefaultNix implements ICommand{
    name = "holochainer.nix.defaultNix";
    execute = async () => {
        const wsedit = new vscode.WorkspaceEdit();
		if (vscode.workspace.workspaceFolders == undefined) {
			vscode.window.showInformationMessage('Open a workspace to create the default nix file');
			return;
		}

		const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath; // gets the path of the first workspace folder
		const filePath = vscode.Uri.file(wsPath + '/default.nix');

		wsedit.createFile(filePath, { ignoreIfExists: true });
		var encoder = new TextEncoder()
		vscode.workspace.fs.writeFile(filePath, encoder.encode(defaultNixFileContent));


		vscode.workspace.applyEdit(wsedit);
		vscode.window.showInformationMessage('Created a new file: default.nix');
    }
}
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