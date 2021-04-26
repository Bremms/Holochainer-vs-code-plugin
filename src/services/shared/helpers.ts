import { FILE } from 'node:dns';
import * as vscode from 'vscode';
import { HcCommandInput } from './ICommand';

export const getRootOfVsCodeExtension = () => {
    var myExtDir = vscode.env.appRoot;
    return myExtDir;
}
export const getTemplateFile = (fileName: string) => {
    var root = getRootOfVsCodeExtension();
    var path = `${root}\\src\\templates\\${fileName}`;
    var vscodeUri = vscode.Uri.parse(path);
    return vscode.workspace.fs.readFile(vscodeUri);
}
export const getActiveTerminal = (show: boolean = true): vscode.Terminal => {
    let terminal = vscode.window.activeTerminal == null ? vscode.window.createTerminal() : vscode.window.activeTerminal;

    if (show)
        terminal.show();

    return terminal;
}
/*
    Params: Contains a list of (defaulVal & message to prompt the user)
    Answers: Give pre defined answers to 'automize' if inputs are already known. 
*/
export const displayTextBoxCommand = async (params: HcCommandInput[], answers?: string[]): Promise<string[]> => {
    var result = [] as any[]
    for (var index = 0; index < params.length; index++) {
        let showInputBox = true;

        if (answers!=null && answers.length - 1 <= index) {
            let answ = answers[index];
            if (answ != null) {
                showInputBox = false;
                result.push(answ);
            }
        }
        if(showInputBox){
            let input = params[index];
            let val = await vscode.window.showInputBox(input);
            result.push(val);
        }
    
    }
    return result;
}
export const executeCmdCommand = (cmd: string, params: string[], defaultVals: string[]) => {
    for (var i = 0; i < params.length; i++) {
        cmd = cmd.replace(`{${i}}`, params[i] == '' ? defaultVals[i] : params[i]);
    }
    getActiveTerminal().sendText(cmd);
}