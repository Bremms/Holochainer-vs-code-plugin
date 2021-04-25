import { AppInit, AppPack, AppUnPack } from "./hc/app";
import { DnaInit, DnaPack, DnaUnPack } from "./hc/dna";
import { SandboxGenerate } from "./hc/sandbox";
import { ICommand } from "./shared/ICommand";
import * as vscode from 'vscode';
import { createDefaultNix, enterNix } from "./nix/nix";
import { compileToWasm } from "./wasm/wasm";
import { InitTests } from "./tests/tests";
import { createZome } from "./zomes/zomes";

export class Holochainer {
    private _hcCommands = [new AppInit(), new AppPack(), new AppUnPack(),
    new DnaInit(), new DnaPack(), new DnaUnPack(),
    new SandboxGenerate()] as ICommand[];
    private _nixCommands = [new enterNix(),new createDefaultNix()] as ICommand[];
    private _wasmCommands = [new compileToWasm()] as ICommand[];
    private _testsCommands = [new InitTests()] as ICommand[];
    private _zomeCommands = [new createZome()]

    registerCommands = (context: vscode.ExtensionContext) => {
        let all = [...this._hcCommands,...this._nixCommands,...this._wasmCommands,...this._testsCommands,...this._zomeCommands];
        all.forEach((cmd) => {
            let ctx = vscode.commands.registerCommand(cmd.name, (args) => {
               cmd.execute(args);
            })
            context.subscriptions.push(ctx);
        })
    }
}