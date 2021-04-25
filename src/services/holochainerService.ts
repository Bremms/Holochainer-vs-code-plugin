import { AppInit, AppPack, AppUnPack } from "./hc/app";
import { DnaInit, DnaPack, DnaUnPack } from "./hc/dna";
import { SandboxGenerate } from "./hc/sandbox";
import { ICommand } from "./shared/ICommand";
import * as vscode from 'vscode';
import { createDefaultNix, enterNix } from "./nix/nix";
import { compileToWasm } from "./wasm/wasm";

export class Holochainer {
    private _hcCommands = [new AppInit(), new AppPack(), new AppUnPack(),
    new DnaInit(), new DnaPack(), new DnaUnPack(),
    new SandboxGenerate()] as ICommand[];
    private _nixCommands = [new enterNix(),new createDefaultNix()] as ICommand[];
    private _wasmCommands = [new compileToWasm()] as ICommand[];
    
    

    registerCommands = (context: vscode.ExtensionContext) => {
        let all = [...this._hcCommands,...this._nixCommands,...this._wasmCommands];
        all.forEach((cmd) => {
            let ctx = vscode.commands.registerCommand(cmd.name, () => {
               cmd.execute();
            })
            context.subscriptions.push(ctx);
        })
    }
}