import * as vscode from 'vscode';
import { HcCommandInput } from './ICommand';

export const getActiveTerminal = (show: boolean = true): vscode.Terminal => {
    let terminal = vscode.window.activeTerminal == null ? vscode.window.createTerminal() : vscode.window.activeTerminal;

    if (show)
        terminal.show();

    return terminal;
}
export const displayTextBoxCommand = async (params: HcCommandInput[]): Promise<string[]> => {
    var result = [] as any[]
    for (var index = 0; index < params.length; index++) {
        let input = params[index];
        let val = await vscode.window.showInputBox(input);
        result.push(val);
    }
    return result;
}
export const executeCmdCommand = (cmd: string, params: string[], defaultVals: string[]) => {
    for (var i = 0; i < params.length; i++) {
        cmd = cmd.replace(`{${i}}`, params[i] == '' ? defaultVals[i] : params[i]);
    }
    getActiveTerminal().sendText(cmd);
}