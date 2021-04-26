import { HcCommandInput, ICommand } from "../shared/ICommand";
import * as vscode from 'vscode';
import { displayTextBoxCommand, executeCmdCommand, getActiveTerminal } from "../shared/helpers";

export class DnaPack implements ICommand {
    name = "holochainer.dna.pack";
    execute = async () => {
        const def = [
            { value: "", prompt: "Select a path. If none supplied 'workdir/dna' will be taken instead" },
            {
                value: "", prompt: `Specify the output path for the packed bundle file.
            
            If not specified, the file will be placed inside the input directory, and given the name "[DNA_NAME].dna`},
        ] as HcCommandInput[];

        let params = await displayTextBoxCommand(def);
        getActiveTerminal().sendText(`hc dna pack ${params[0] == '' ? '' : `-o ${params[0]}`}${params[1] == '' ? 'workdir/dna' : params[2]} `)
    }
}
export class DnaUnPack implements ICommand {
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

        let params = await displayTextBoxCommand(def);
        getActiveTerminal().sendText(`hc dna unpack ${params[0] == '' ? '' : `-o ${params[0]}`}${params[1] == '' ? 'workdir/dna' : params[1]} `)
    }
}
export class DnaInit implements ICommand {
    name = "holochainer.dna.init";
    execute = async () => {
        const def = [
            {
                value: '',
                prompt: "Select a path. If none supplied 'workdir/dna' will be taken instead",
            }
        ] as HcCommandInput[];

        let params = await displayTextBoxCommand(def);
        getActiveTerminal().sendText(`hc dna init ${params[0] == "" ? 'workdir/dna' : params[0]}`);
    }
}