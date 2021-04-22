import { AppInit, AppPack, AppUnPack } from "./hc/app";
import { DnaInit, DnaPack, DnaUnPack } from "./hc/dna";
import { SandboxGenerate } from "./hc/sandbox";
import { ICommand } from "./shared/ICommand";
import * as vscode from 'vscode';

export class Holochainer {
    private _commands = [new AppInit(), new AppPack(), new AppUnPack(),
    new DnaInit(), new DnaPack(), new DnaUnPack(),
    new SandboxGenerate()] as ICommand[];

    registerCommands = (context: vscode.ExtensionContext) => {
        this._commands.forEach((cmd) => {
            var ctx = vscode.commands.registerCommand(cmd.name, () => {
               cmd.execute();
            })
            context.subscriptions.push(ctx);
        })
    }
}