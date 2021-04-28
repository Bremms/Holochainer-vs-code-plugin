import { getActiveTerminal, getWorkspace } from "../shared/helpers";
import { ICommand } from "../shared/ICommand";
import * as vscode from 'vscode';
export class compileToWasm implements ICommand {
    name = "holochainer.wasm.compile";
    execute = async () => {
        var workSpace = getWorkspace();
        getActiveTerminal().sendText(`cd ${workSpace}`)
        getActiveTerminal().sendText("CARGO_TARGET_DIR=target cargo build --release --target wasm32-unknown-unknown");
       
    }
}

