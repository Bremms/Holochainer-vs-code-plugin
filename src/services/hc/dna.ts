import { HcCommandInput, ICommand } from "../shared/ICommand";
import * as vscode from 'vscode';
import { inject, injectable } from "inversify";
import TYPES from "../../dependencyInjection/types";
import { IVsCodeService } from "../shared/vscodeService";
@injectable()
export class DnaPack implements ICommand {
    constructor(@inject(TYPES.IVsCodeService) private vscodeService : IVsCodeService){};

    name = "holochainer.dna.pack";
    execute = async () => {
        const def = [
            { value: "", prompt: "Select a path. If none supplied 'workdir/dna' will be taken instead" },
            {
                value: "", prompt: `Specify the output path for the packed bundle file.
            
            If not specified, the file will be placed inside the input directory, and given the name "[DNA_NAME].dna`},
        ] as HcCommandInput[];

        let params = await this.vscodeService.displayTextBoxCommand(def);
        this.vscodeService.goToActiveWorkspace();
        this.vscodeService.getActiveTerminal(true).sendText(`hc dna pack ${params[0] == '' ? '' : `-o ${params[0]}`}${params[1] == '' ? `workdir/dna` : params[2]} `)
    }
}
@injectable()
export class DnaUnPack implements ICommand {
    constructor(@inject(TYPES.IVsCodeService) private vscodeService : IVsCodeService){};

    name = "holochainer.dna.unpack";
    execute = async () => {
        const def = [
            {
                value: '',
                prompt: "Select a path. If none supplied 'workdir/dna' will be taken instead",
            },
            {
                value: '',
                prompt: `Specify the output path for the packed bundle file.
                    
                If not specified, the file will be placed inside the input directory, and given the name "[DNA_NAME].dna"`,
            }
        ] as HcCommandInput[];

        let params = await  this.vscodeService.displayTextBoxCommand(def);
        this.vscodeService.goToActiveWorkspace()
        this.vscodeService.getActiveTerminal(true).sendText(`hc dna unpack ${params[0] == '' ? '' : `-o ${params[0]}`}${params[1] == '' ? `workdir/dna` : params[1]} `)
    }
}
@injectable()
export class DnaInit implements ICommand {
    constructor(@inject(TYPES.IVsCodeService) private vscodeService : IVsCodeService){};

    name = "holochainer.dna.init";
    execute = async () => {
        const def = [
            {
                value: '',
                prompt: "Select a path. If none supplied 'workdir/dna' will be taken instead",
            }
        ] as HcCommandInput[];

        let params = await this.vscodeService.displayTextBoxCommand(def);
        this.vscodeService.goToActiveWorkspace();
        var workSpacePath = this.vscodeService.getWorkspace();
        let path  = params[0] == "" ? 'workdir/dna' : params[0];
        let dnaYamlPath = `${workSpacePath}/${path}/dna.yaml`;
        this.vscodeService.getActiveTerminal(true).sendText(`hc dna init ${path}`);
        vscode.window.showInformationMessage('Folow the instructions in the terminal to proceed.');
        this.vscodeService.tryOpenFile(20000,dnaYamlPath);
      
        // setTimeout(() =>{
        //     openFileInEditor(dnaYamlPath);
        // } ,6000 )
        
    }
}
