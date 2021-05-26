import { ExtensionTerminalOptions, Terminal, TerminalExitStatus, TerminalOptions } from "vscode";
import { HcCommandInput } from "../../../services/shared/ICommand";
import { IVsCodeService, VsCodeService } from "../../../services/shared/vscodeService";
import * as vscode from 'vscode';
import VsCodeTerminal, { ICommandTerminal } from "../../../services/shared/VsCodeTerminal";

export class MockFactory{

   static getVsCodeServiceMock = () => {
        var vscodeMock = new VsCodeService(new MockTerminal());

        return vscodeMock;
    }
}

// export class DummyVsCodeService implements IVsCodeService {
//     filesOpenInEditor = [] as string[];
//     textboxesDisplayed = [] as HcCommandInput[];
//     goToActiveWorkspaceCalled = false;
//     getWorkspaceCalled = false;

//     openFileInEditor(filePath: string) :Promise<void> {
//         this.filesOpenInEditor.push(filePath);
//         return new Promise((resolve, reject) => {
//               resolve();
//           });
//     }
//     tryOpenFile(ms: number, filePath: string) : Promise<void>{
//         return this.openFileInEditor(filePath);
//     };
//     goToActiveWorkspace() : void  {

//     };
//     getWorkspace () { 
//          const wsedit = new vscode.WorkspaceEdit();
//         if (vscode.workspace.workspaceFolders == undefined) {
//             vscode.window.showInformationMessage('Open a workspace to create the test directories');
//             return;
//         }
//         const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath;

//         return wsPath;
//     };
//     getActiveTerminal (show: boolean) {
//         return new MockTerminal();
//     };
//     displayTextBoxCommand(params: HcCommandInput[], answers?: string[] | undefined) : Promise<any[]>{
//         return new Promise((resolve, reject) => {
//             resolve([]);
//         });
//     };

// }
export class MockTerminal implements ICommandTerminal {

    textBuffer = [] as string[];
    showCalled : number = 0;
    hideCalled : number = 0;

    sendText(text: string, addNewLine?: boolean): void {
        this.textBuffer.push(`${text}${addNewLine?'\n':''}`)
    }
    show(preserveFocus?: boolean): void {
        this.showCalled++;
    }
    hide(): void {
      this.hideCalled++;
    }
    dispose(): void {
       
    }

}