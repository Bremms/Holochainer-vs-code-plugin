import * as vscode from 'vscode';
import { displayTextBoxCommand, getActiveTerminal, goToActiveWorkspace } from '../shared/helpers';
import { HcCommandInput, ICommand } from '../shared/ICommand';

export class AppInit implements ICommand {
   
    name = "holochainer.app.init";
    execute = async () => {
        const def = [
            {
                value: '',
                prompt: "Select a path. If none supplied 'workdir/happ' will be taken instead",
            },
        ] as HcCommandInput[];
       
        let params = await displayTextBoxCommand(def);
        goToActiveWorkspace();
        getActiveTerminal().sendText(`hc app init ${params[0] == "" ? 'workdir/happ' : params[1]}`);
    
    }
}
export class AppPack implements ICommand {
    name = "holochainer.app.pack";
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
    
        let params = await displayTextBoxCommand(def);
        goToActiveWorkspace();
        getActiveTerminal().sendText(`hc app pack ${params[1] == '' ?   '' : `-o ${params[1]}`} ${params[0]  == "" ? 'workdir/happ' : params[0]}`);

    }
}
export class AppUnPack implements ICommand {
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
        let params = await displayTextBoxCommand(def);
        goToActiveWorkspace();
        getActiveTerminal().sendText(`hc app unpack ${params[1] == '' ?   '' : `-o ${params[1]}`} ${params[0]  == "" ? 'workdir/happ' : params[0]}`);

    }
}

