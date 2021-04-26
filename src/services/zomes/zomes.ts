import { displayTextBoxCommand, getActiveTerminal, getRootOfVsCodeExtension, getTemplateFile } from "../shared/helpers";
import { HcCommandInput, ICommand } from "../shared/ICommand";
import * as vscode from 'vscode';
import { TextEncoder } from "util";

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
    vscode.workspace.fs.createDirectory(zomesPath);
    var createCmd = new createZome();

    await createCmd.execute({ path: zomesPath.path, answers: [null, "y"] });
    vscode.window.showInformationMessage('Zome directory intialized');
  }
}
export class createZome implements ICommand {
  name = "holochainer.zomes.create";
  execute = async (args: any) => {
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

    let params = await displayTextBoxCommand(def,args.answers);
    var rootPath = vscode.Uri.file(folderClicked);
    var folderName = rootPath.path.split("/")[rootPath.path.split("/").length - 1];

    let rootCargoDir = vscode.Uri.file(`${folderClicked}\\Cargo.toml`);
    let srcPath = vscode.Uri.file(`${folderClicked}\\${params[0]}\\src`);
    let zomeFilePath = vscode.Uri.file(`${folderClicked}\\${params[0]}\\src\\lib.rs`);
    let cargoDefaultFilePath = vscode.Uri.file(`${folderClicked}\\${params[0]}\\Cargo.toml`);
    vscode.workspace.fs.createDirectory(srcPath);
    vscode.workspace.fs.writeFile(zomeFilePath, textEncoder.encode(defaultZome));
    vscode.workspace.fs.writeFile(cargoDefaultFilePath, textEncoder.encode(defaultCargo.replace(/{zome_name}/g, params[0])));

    if (params[1]?.toLowerCase() == "y") {
      vscode.workspace.fs.writeFile(rootCargoDir, textEncoder.encode(defaultRootCargo.replace(/{zome_folder}/g, folderName).replace(/{zome_name}/g, params[0])));
    }
    vscode.window.showInformationMessage(`Zome '${params[0]}' created `);
  }
}

let defaultZome = `use hdk::prelude::*;

#[hdk_extern]
pub fn hello(_: ()) -> ExternResult<String> {
Ok(String::from("Hello Holo Dev"))
}`

let defaultCargo = `
[package]
name = "{zome_name}"
version = "0.0.1"
authors = [ "[your name]", "[your email address]" ]
edition = "2018"

[lib]
name = "{zome_name}"
crate-type = [ "cdylib", "rlib" ]

[dependencies]
hdk = "0.0.100"
serde = "1"
`
let defaultRootCargo = `
[workspace]
members = [
  "{zome_folder}/{zome_name}",
]

[profile.dev]
opt-level = "z"

[profile.release]
opt-level = "z"
`