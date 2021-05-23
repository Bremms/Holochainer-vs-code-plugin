import { inject, injectable } from 'inversify';
import * as vscode from 'vscode';
import TYPES from '../../dependencyInjection/types';
import { HcCommandInput, ICommand } from '../shared/ICommand';
import { IVsCodeService } from '../shared/vscodeService';

@injectable()
export class compileToWasm implements ICommand {
    constructor(@inject(TYPES.IVsCodeService) private vscodeService : IVsCodeService){};

    name = "holochainer.wasm.compile";
    execute = async () => {
        this.vscodeService.goToActiveWorkspace();
        this.vscodeService.getActiveTerminal(true).sendText("CARGO_TARGET_DIR=target cargo build --release --target wasm32-unknown-unknown");
       
    }
}

