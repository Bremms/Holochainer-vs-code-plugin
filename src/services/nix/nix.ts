import { getActiveTerminal, getRootOfVsCodeExtension, getTemplateFile, getWorkspace, goToActiveWorkspace, openFileInEditor } from "../shared/helpers";
import { ICommand } from "../shared/ICommand";
import * as vscode from 'vscode';
import { TextEncoder } from 'util';
import { defaultNixFileContent } from "../../templates/templateStore";
export class enterNix implements ICommand {
  name = "holochainer.nix";
  execute = async (args: any) => {
    goToActiveWorkspace();
    getActiveTerminal().sendText("nix-shell .");
  }
}


export class createDefaultNix implements ICommand {
  name = "holochainer.nix.defaultNix";
  execute = async () => {
    const wsedit = new vscode.WorkspaceEdit();
    goToActiveWorkspace();
    var wsPath = getWorkspace();
    const filePath = vscode.Uri.file(wsPath + '/default.nix');

    await wsedit.createFile(filePath, { ignoreIfExists: true });
    var encoder = new TextEncoder()
    await vscode.workspace.fs.writeFile(filePath, encoder.encode(defaultNixFileContent));

    openFileInEditor(filePath.path)
    // vscode.workspace.applyEdit(wsedit);
    // vscode.workspace.openTextDocument(filePath).then((textDoc: vscode.TextDocument) => {
    //   vscode.window.showTextDocument(textDoc);
    // })
    vscode.window.showInformationMessage('Created a new file: default.nix');
  }
}
