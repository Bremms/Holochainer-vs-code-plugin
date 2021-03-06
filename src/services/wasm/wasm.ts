import { getActiveTerminal, getWorkspace, goToActiveWorkspace } from "../shared/helpers";
import { ICommand } from "../shared/ICommand";
import * as vscode from 'vscode';
export class compileToWasm implements ICommand {
    name = "holochainer.wasm.compile";
    execute = async () => {
        goToActiveWorkspace();
        getActiveTerminal().sendText("CARGO_TARGET_DIR=target cargo build --release --target wasm32-unknown-unknown");
       
    }
}

