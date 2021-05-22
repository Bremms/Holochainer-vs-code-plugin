import { getActiveTerminal, getRootOfVsCodeExtension, getTemplateFile, openFileInEditor } from "../shared/helpers";
import { ICommand } from "../shared/ICommand";
import * as vscode from 'vscode';
import { TextEncoder } from "util";
export class InitTests implements ICommand {
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
   
    getActiveTerminal().sendText(`cd ${testsPath}`);
    getActiveTerminal().sendText(`npm install`);

    openFileInEditor(defaultTestFilePath.path);
  }
}