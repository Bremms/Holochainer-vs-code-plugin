import * as vscode from 'vscode';
import { getActiveTerminal } from './helpers';
export interface ICommand{
    name:string,
    execute : (args : any) => Promise<void>;
}
export interface HcCommandInput {
    value: string,
    prompt: string
}