import * as vscode from 'vscode';
import { displayTextBoxCommand, getActiveTerminal } from '../shared/helpers';
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
        getActiveTerminal().sendText(`hc app unpack ${params[1] == '' ?   '' : `-o ${params[1]}`} ${params[0]  == "" ? 'workdir/happ' : params[0]}`);

    }
}
// export async function hcAppInit() {
//     const path = await vscode.window.showInputBox({
//         value: '',
//         prompt: "Select a path. If none supplied 'workdir/happ' will be taken instead",
//     });
//     getActiveTerminal().sendText(`hc app init ${path == "" ? 'workdir/happ' : path}`);
// }

// export async function hcAppPack() {
//     const path = await vscode.window.showInputBox({
//         value: '',
//         prompt: "Select a path. If none supplied 'workdir/happ' will be taken instead",
//     });

//     var output = await vscode.window.showInputBox({
//         value: '',
//         prompt: `Specify the output path for the packed bundle file.

// 		If not specified, the file will be placed inside the input directory, and given the name "[DNA_NAME].dna"`,
//     });

//     getActiveTerminal().sendText(`hc app pack ${path == "" ? 'workdir/happ' : path}`);
// }
// export async function hcAppUnPack() {
//     const path = await vscode.window.showInputBox({
//         value: '',
//         prompt: "Select a path. If none supplied 'workdir/happ' will be taken instead",
//     });

//     var output = await vscode.window.showInputBox({
//         value: '',
//         prompt: `Specify the output path for the packed bundle file.

// 		If not specified, the file will be placed inside the input directory, and given the name "[DNA_NAME].dna"`,
//     });
//     var appId = await vscode.window.showInputBox({
//         value: '',
//         prompt: `Specify the output path for the packed bundle file.

// 		If not specified, the file will be placed inside the input directory, and given the name "[DNA_NAME].dna"`,
//     });
//     var port = await vscode.window.showInputBox({
//         value: '',
//         prompt: ` You may optionally specify app interface ports to bind when running. This allows your UI to talk to the
// 		conductor.

// 		For example, "0,9000,0" will create three app interfaces. Or, specify nothing to run
// 		without attaching any app interfaces.`,
//     });
//     getActiveTerminal().sendText(`hc app unpack ${output == '' ? '' : `-o ${output}`} ${path == "" ? 'workdir/happ' : path}`);
// }

