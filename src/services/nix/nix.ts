import { inject, injectable } from 'inversify';
import * as vscode from 'vscode';
import TYPES from '../../dependencyInjection/types';
import { HcCommandInput, ICommand } from '../shared/ICommand';
import { IVsCodeService } from '../shared/vscodeService';
import { TextEncoder } from "util";
import { defaultNixFileContent } from '../../templates/templateStore';

@injectable()
export class enterNix implements ICommand {

  constructor(@inject(TYPES.IVsCodeService) private vscodeService : IVsCodeService){};

  name = "holochainer.nix";
  execute = async (args: any) => {
    this.vscodeService.goToActiveWorkspace();
    this.vscodeService.getActiveTerminal(true).sendText("nix-shell .");
  }
}

@injectable()
export class createDefaultNix implements ICommand {
  constructor(@inject(TYPES.IVsCodeService) private vscodeService : IVsCodeService){};

  name = "holochainer.nix.defaultNix";
  execute = async () => {
    const wsedit = new vscode.WorkspaceEdit();
    this.vscodeService.goToActiveWorkspace();
    var wsPath = this.vscodeService.getWorkspace();
    const filePath = vscode.Uri.file(wsPath + '/default.nix');

    await wsedit.createFile(filePath, { ignoreIfExists: true });
    var encoder = new TextEncoder()
    await vscode.workspace.fs.writeFile(filePath, encoder.encode(defaultNixFileContent));

    this.vscodeService.openFileInEditor(filePath.path)
    // vscode.workspace.applyEdit(wsedit);
    // vscode.workspace.openTextDocument(filePath).then((textDoc: vscode.TextDocument) => {
    //   vscode.window.showTextDocument(textDoc);
    // })
    vscode.window.showInformationMessage('Created a new file: default.nix');
  }
}
