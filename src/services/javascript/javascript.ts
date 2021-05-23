import { inject, injectable } from 'inversify';
import * as vscode from 'vscode';
import TYPES from '../../dependencyInjection/types';
import { HcCommandInput, ICommand } from '../shared/ICommand';
import { IVsCodeService } from '../shared/vscodeService';

@injectable()
export class npmInstallConductor implements ICommand {
    constructor(@inject(TYPES.IVsCodeService) private vscodeService : IVsCodeService){};

    name= "holochainer.js.installConductorApi";
    execute = async () => {
        this.vscodeService.getActiveTerminal(true).sendText("npm install @holochain/conductor-api")
    }
}