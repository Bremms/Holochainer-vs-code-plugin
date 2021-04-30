import { getActiveTerminal, getRootOfVsCodeExtension, getTemplateFile, openFileInEditor } from "../shared/helpers";
import { ICommand } from "../shared/ICommand";
import * as vscode from 'vscode';
import { TextEncoder } from "util";


export class npmInstallConductor implements ICommand {
    name= "holochainer.js.installConductorApi";
    execute = async () => {
       getActiveTerminal().sendText("npm install @holochain/conductor-api")
    }
}