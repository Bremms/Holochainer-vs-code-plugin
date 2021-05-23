import { FILE } from 'node:dns';
import * as vscode from 'vscode';
import { HcCommandInput } from './ICommand';
import * as fs from 'fs';

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


export const getRootOfVsCodeExtension = () => {
    var myExtDir = vscode.env.appRoot;
    return myExtDir;
}
export const getTemplateFile = (fileName: string) => {
    var root = getRootOfVsCodeExtension();
    var path = `${root}/src/templates/${fileName}`;
    var vscodeUri = vscode.Uri.parse(path);
    return vscode.workspace.fs.readFile(vscodeUri);
}
