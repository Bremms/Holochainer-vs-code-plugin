import { displayTextBoxCommand, getActiveTerminal, getRootOfVsCodeExtension, getTemplateFile } from "../shared/helpers";
import { HcCommandInput, ICommand } from "../shared/ICommand";
import * as vscode from 'vscode';
import { TextEncoder } from "util";
export class createZome implements ICommand {
  name = "holochainer.zomes.create";
  execute = async (args : any) => {
    var folderClicked = args.path;
    const def = [
      {
        value: '',
        prompt: "How do you want to call your zome?",
      },

    ] as HcCommandInput[];
    let textEncoder = new TextEncoder();

    let params = await displayTextBoxCommand(def);
    let srcPath = vscode.Uri.file(`${folderClicked}\\${params[0]}\\src`);
    let zomeFilePath = vscode.Uri.file(`${folderClicked}\\${params[0]}\\src\\zome.rs`);
    let cargoDefaultFilePath = vscode.Uri.file(`${folderClicked}\\${params[0]}\\Cargo.toml`);
    vscode.workspace.fs.createDirectory(srcPath);
    vscode.workspace.fs.writeFile(zomeFilePath,textEncoder.encode(defaultZome));
    vscode.workspace.fs.writeFile(cargoDefaultFilePath,textEncoder.encode(defaultCargo));

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