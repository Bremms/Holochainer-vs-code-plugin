import { displayTextBoxCommand, getActiveTerminal, getRootOfVsCodeExtension, getTemplateFile, openFileInEditor } from "../shared/helpers";
import { HcCommandInput, ICommand } from "../shared/ICommand";
import * as vscode from 'vscode';
import { TextEncoder } from "util";
import * as fs from 'fs';
import { defaultCargo, defaultRootCargo, defaultZome } from "../../templates/templateStore";
var toml = require('toml');
var json2toml = require('json2toml');
export class initZome implements ICommand {
  name = "holochainer.zomes.init";
  execute = async (args: any) => {
    const wsedit = new vscode.WorkspaceEdit();
    if (vscode.workspace.workspaceFolders == undefined) {
      vscode.window.showInformationMessage('Open a workspace to create the zome directory');
      return;
    }

    const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath; // gets the path of the first workspace folder
    let zomesPath = vscode.Uri.file(`${wsPath}/zomes`);
    await vscode.workspace.fs.createDirectory(zomesPath);
    var createCmd = new createZome();

    await createCmd.execute({ path: zomesPath.path, answers: [null, "y"] });
    vscode.window.showInformationMessage('Zome directory intialized');
  }
}

export class createZome implements ICommand {
  name = "holochainer.zomes.create";
  execute = async (args: any) => {

    if (vscode.workspace.workspaceFolders == undefined) {
      vscode.window.showInformationMessage('Open a workspace to create the zome directory');
      return;
    }

    const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath; // gets the path of the first workspace folder

    var folderClicked = args.path;
    const def = [
      {
        value: '',
        prompt: "How do you want to call your zome?",
      },
      {
        value: '',
        prompt: "Is this your first zome (y/n)? If y it will create a Cargo.toml for all zomes",
      },
    ] as HcCommandInput[];
    let textEncoder = new TextEncoder();

    let params = await displayTextBoxCommand(def, args.answers);
    var [zomeName, firstZome] = params;
    if (zomeName == undefined || zomeName == '') zomeName = "zome";

    //Define all paths to create file
    let rootPath = vscode.Uri.file(folderClicked);
    let zomeFolder = rootPath.path.split("/")[rootPath.path.split("/").length - 1];
    let rootCargoDir = vscode.Uri.file(`${wsPath}/Cargo.toml`);
    let srcPath = vscode.Uri.file(`${folderClicked}/${zomeName}/src`);
    let zomeFilePath = vscode.Uri.file(`${folderClicked}/${zomeName}/src/lib.rs`);
    let cargoDefaultFilePath = vscode.Uri.file(`${folderClicked}/${zomeName}/Cargo.toml`);

    //Create the directories and files
    await vscode.workspace.fs.createDirectory(srcPath);
    await vscode.workspace.fs.writeFile(zomeFilePath, textEncoder.encode(defaultZome));
    await vscode.workspace.fs.writeFile(cargoDefaultFilePath, textEncoder.encode(defaultCargo.replace(/{zome_name}/g, zomeName)));
    openFileInEditor(zomeFilePath.path);

    if (firstZome?.toLowerCase() == "y") {
      await vscode.workspace.fs.writeFile(rootCargoDir, textEncoder.encode(defaultRootCargo.replace(/{zome_folder}/g, zomeFolder).replace(/{zome_name}/g, zomeName)));

    } else {
      //Not the first zome. Check if there is a cargo.toml on the root dir
      await tryAddZomeToCargoDef(rootCargoDir, `zomes/${zomeName}`);
    }


    vscode.window.showInformationMessage(`Zome '${zomeName}' created `);

  }
}
const tryAddZomeToCargoDef = async (rootCargoDir: vscode.Uri, zomePath: string) => {

  if (fs.existsSync(rootCargoDir.fsPath)) {
    let val = await vscode.window.showInputBox({ value: '', prompt: 'Add to root Cargo.toml? (y/n)' });
    if (val?.toLowerCase() == "y") {
      try {
        let defaultCargoToml = await vscode.workspace.openTextDocument(rootCargoDir);
        var cargoContent = toml.parse(defaultCargoToml.getText());
        cargoContent.workspace.members.push(zomePath);
        var tomlNewContent = json2toml(cargoContent,
          { indent: 2, newlineAfterSection: true });
        let textEncoder = new TextEncoder();
        await vscode.workspace.fs.writeFile(rootCargoDir, textEncoder.encode(tomlNewContent));
        openFileInEditor(rootCargoDir.fsPath)

      } catch (err) {

      }
    }
  }
}