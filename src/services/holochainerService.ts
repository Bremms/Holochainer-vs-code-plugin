import { ICommand } from "./shared/ICommand";
import * as vscode from 'vscode';
import { multiInject, injectable } from 'inversify';
import TYPES from "../dependencyInjection/types";
@injectable()
export class Holochainer {

    constructor(
        @multiInject(TYPES.ICommand) private commands: ICommand[]
    ) { }
    
    registerCommands(context: vscode.ExtensionContext) {
        debugger;
        for (const c of this.commands) {
            const cmd = vscode.commands.registerCommand(c.name, c.execute);
            context.subscriptions.push(cmd);
        }
    }
}