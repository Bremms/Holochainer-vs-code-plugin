import { displayTextBoxCommand, getActiveTerminal, getRootOfVsCodeExtension, getTemplateFile, openFileInEditor } from "../shared/helpers";
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
    var rootPath = vscode.Uri.file(folderClicked);
    var folderName = rootPath.path.split("/")[rootPath.path.split("/").length - 1];

    let rootCargoDir = vscode.Uri.file(`${wsPath}/Cargo.toml`);
    let srcPath = vscode.Uri.file(`${folderClicked}/${params[0]}/src`);
    let zomeFilePath = vscode.Uri.file(`${folderClicked}/${params[0]}/src/lib.rs`);
    let cargoDefaultFilePath = vscode.Uri.file(`${folderClicked}/${params[0]}/Cargo.toml`);
    await vscode.workspace.fs.createDirectory(srcPath);
    await vscode.workspace.fs.writeFile(zomeFilePath, textEncoder.encode(defaultZome));
    await vscode.workspace.fs.writeFile(cargoDefaultFilePath, textEncoder.encode(defaultCargo.replace(/{zome_name}/g, params[0])));
    openFileInEditor(zomeFilePath.path);
    if (params[1]?.toLowerCase() == "y") {
      await vscode.workspace.fs.writeFile(rootCargoDir, textEncoder.encode(defaultRootCargo.replace(/{zome_folder}/g, folderName).replace(/{zome_name}/g, params[0])));
     
    }
    vscode.window.showInformationMessage(`Zome '${params[0]}' created `);

  }
}

let defaultZome = `use hdk::prelude::*;

entry_defs![Greeting::entry_def()];

#[hdk_entry(id = "greeting")]
pub struct Greeting(String);

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct SomeExternalInput {
    content: String,
}

#[hdk_extern]
pub fn say_greeting(input: SomeExternalInput) -> ExternResult<String> {
  
  Ok(input.content)
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
holo_hash = "0.0.2-alpha"
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