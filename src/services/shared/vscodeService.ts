
import { inject, injectable } from 'inversify';
import * as vscode from 'vscode';
import { HcCommandInput } from './ICommand';
import * as fs from 'fs';
import { sleep } from './helpers';
import TYPES from '../../dependencyInjection/types';
import { ICommandTerminal } from './VsCodeTerminal';
export interface IVsCodeService {
    tryOpenFile: (ms: number, filePath: string) => Promise<void>
    openFileInEditor: (filePath: string) => Promise<void>;
    goToActiveWorkspace: () => void;
    getWorkspace: () => string | undefined;
    getActiveTerminal: (show: boolean) => ICommandTerminal;
    /*
   Params: Contains a list of (defaulVal & message to prompt the user)
   Answers: Give pre defined answers to 'automize' if inputs are already known. 
*/
    displayTextBoxCommand: (params: HcCommandInput[], answers?: string[]) => Promise<string[]>
}
@injectable()
export class VsCodeService implements IVsCodeService {

    constructor(@inject(TYPES.ITerminalCommand) private commandTerminal: ICommandTerminal) { };

    openFileInEditor = async (filePath: string) => {
        await vscode.workspace.openTextDocument(filePath).then((textDoc: vscode.TextDocument) => {
            vscode.window.showTextDocument(textDoc);

        })
    }
    tryOpenFile = async (ms: number, filePath: string) => {

        let sleepAmtMs = 1000;
        let msRan = 0;
        while (msRan < ms) {
            if (fs.existsSync(filePath)) {
                this.openFileInEditor(filePath);
                break;
            }

            await sleep(sleepAmtMs);
            msRan += sleepAmtMs;
        }


    }
    goToActiveWorkspace = () => {
        this.getActiveTerminal(true).sendText(`cd ${this.getWorkspace()}`);
    }
    getWorkspace = () => {
        const wsedit = new vscode.WorkspaceEdit();
        if (vscode.workspace.workspaceFolders == undefined) {
            vscode.window.showInformationMessage('Open a workspace to create the test directories');
            return;
        }
        const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath;

        return wsPath;
    };
    getActiveTerminal = (show: boolean) => {
        if (show)
            this.commandTerminal.show();

        return this.commandTerminal;
    };
    displayTextBoxCommand = async (params: HcCommandInput[], answers?: string[] | undefined) => {
        var result = [] as any[]
        for (var index = 0; index < params.length; index++) {
            let showInputBox = true;

            if (answers != null && answers.length - 1 >= index) {
                let answ = answers[index];
                if (answ != null) {
                    showInputBox = false;
                    result.push(answ);
                }
            }
            if (showInputBox) {
                let input = params[index];
                let val = await vscode.window.showInputBox(input);
                if (val == undefined) {
                    vscode.window.showInformationMessage('Failed to execute holochainer commando. Aborted by the user');
                    throw "Aborted by user";
                }
                result.push(val);
            }

        }
        return result;
    }

}