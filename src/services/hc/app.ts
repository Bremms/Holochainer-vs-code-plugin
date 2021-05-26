import { inject, injectable } from 'inversify';
import * as vscode from 'vscode';
import TYPES from '../../dependencyInjection/types';
import { HcCommandInput, ICommand } from '../shared/ICommand';
import { IVsCodeService } from '../shared/vscodeService';

@injectable()
export class AppInit implements ICommand {
   
    constructor(@inject(TYPES.IVsCodeService) private vscodeService : IVsCodeService){};

    name = "holochainer.app.init";
    execute = async (args: any) => {
        
        const def = [
            {
                value: '',
                prompt: "Select a path. If none supplied 'workdir/happ' will be taken instead",
            },
        ] as HcCommandInput[];
        let params = await this.vscodeService.displayTextBoxCommand(def,args?.answers);
        this.vscodeService.goToActiveWorkspace();

        let path = params[0] == "" ? 'workdir/happ' : params[0];
        this.vscodeService.getActiveTerminal(true).sendText(`hc app init ${path}`);
        
        let workSpacePath = this.vscodeService.getWorkspace();
        let dnaYamlPath = `${workSpacePath}/${path}/happ.yaml`;
        this.vscodeService.tryOpenFile(20000,dnaYamlPath);
    }
}
@injectable()
export class AppPack implements ICommand {
    constructor(@inject(TYPES.IVsCodeService) private vscodeService : IVsCodeService){};

    name = "holochainer.app.pack";
    execute = async (args: any) => {
        const def = [
            {
                value: '',
                prompt: "Select a path. If none supplied 'workdir/happ' will be taken instead",
            },
            {
                value: '',
                prompt: `Specify the output path for the packed bundle file.
                    
                If not specified, the file will be placed inside the input directory, and given the name "[DNA_NAME].dna"`,
            } 
        ] as HcCommandInput[];
    
        let params = await   this.vscodeService.displayTextBoxCommand(def,args?.answers);
        this.vscodeService.goToActiveWorkspace();
        this.vscodeService.getActiveTerminal(true).sendText(`hc app pack ${params[1] == '' ?   '' : `-o ${params[1]}`} ${params[0]==""?'workdir/happ' : params[0]}`);

    }
}
@injectable()
export class AppUnPack implements ICommand { 
    constructor(@inject(TYPES.IVsCodeService) private vscodeService : IVsCodeService){};
    name = "holochainer.app.unpack";
    execute = async () => {
        const def = [
            {
                value: '',
                prompt: "Select a path. If none supplied 'workdir/happ' will be taken instead",
            },
            {
                value: '',
                prompt: `Specify the output path for the packed bundle file.
                    
                If not specified, the file will be placed inside the input directory, and given the name "[DNA_NAME].dna"`,
            }
        ] as HcCommandInput[];
        let params = await  this.vscodeService.displayTextBoxCommand(def);
        this.vscodeService.goToActiveWorkspace();
        this.vscodeService.getActiveTerminal(true).sendText(`hc app unpack ${params[1] == '' ?   '' : `-o ${params[1]}`} ${params[0]  == "" ? 'workdir/happ' : params[0]}`);

    }
}

