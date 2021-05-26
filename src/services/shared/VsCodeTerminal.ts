import { injectable } from "inversify";
import * as vscode from 'vscode';

export interface ICommandTerminal{
    sendText(text: string, addNewLine?: boolean): void 
    show(preserveFocus?: boolean): void
    hide(): void
    dispose(): void

}
@injectable()
export default class VsCodeTerminal implements ICommandTerminal{
   
    activeTerminal = () => {
        let terminal = vscode.window.activeTerminal == null ? vscode.window.createTerminal() : vscode.window.activeTerminal;
        return terminal;
    }
    sendText(text: string, addNewLine?: boolean): void {
        this.activeTerminal().sendText(text, addNewLine);
    }
    show(preserveFocus?: boolean): void {
        this.activeTerminal().show(preserveFocus);
    }
    hide(): void {
        this.activeTerminal().hide();
    }
    dispose(): void {
        this.activeTerminal().dispose();
    }
}