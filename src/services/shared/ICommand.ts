import * as vscode from 'vscode';
import { getActiveTerminal } from './helpers';
export interface ICommand{
    name:string,
    execute : () => Promise<void>;
}
export interface HcCommandInput {
    value: string,
    prompt: string
}