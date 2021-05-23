import { ICommand } from "../shared/ICommand";
import * as vscode from 'vscode';
import { TextEncoder } from "util";
import { defaultTestFile, packageJsonFile, tsconfigFile } from "../../templates/templateStore";
import { inject, injectable } from "inversify";
import TYPES from "../../dependencyInjection/types";
import { IVsCodeService } from "../shared/vscodeService";

@injectable()
export class InitTests implements ICommand {
  constructor(@inject(TYPES.IVsCodeService) private vscodeService : IVsCodeService){};

  name = "holochainer.tests.init";
  execute = async () => {
    const wsedit = new vscode.WorkspaceEdit();
    if (vscode.workspace.workspaceFolders == undefined) {
      vscode.window.showInformationMessage('Open a workspace to create the test directories');
      return;
    }
    const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath; // gets the path of the first workspace folder
    const filePath = vscode.Uri.file(wsPath + '/tests/src');
    var testsPath = wsPath + '/tests';
    let textEncoder = new TextEncoder();
    const tsconfigPath = vscode.Uri.file(wsPath + "/tests/tsconfig.json");
    const packageJsonPath = vscode.Uri.file(wsPath + "/tests/package.json");
    const defaultTestFilePath = vscode.Uri.file(wsPath + "/tests/src/index.ts");
    await vscode.workspace.fs.createDirectory(filePath);
    await vscode.workspace.fs.writeFile(tsconfigPath, textEncoder.encode(tsconfigFile));
    await vscode.workspace.fs.writeFile(packageJsonPath, textEncoder.encode(packageJsonFile));
    await vscode.workspace.fs.writeFile(defaultTestFilePath, textEncoder.encode(defaultTestFile));
   
    this.vscodeService.getActiveTerminal(true).sendText(`cd ${testsPath}`);
    this.vscodeService.getActiveTerminal(true).sendText(`npm install`);

    this.vscodeService.openFileInEditor(defaultTestFilePath.path);
  }
}