import { HcCommandInput, ICommand } from "../shared/ICommand";
import * as vscode from 'vscode';
import { displayTextBoxCommand, executeCmdCommand, getActiveTerminal } from "../shared/helpers";


export class SandboxGenerate implements ICommand {
    name = "holochainer.sandbox.generate";
    execute = async () => {
        const def = [
            {
                value: '',
                prompt: "Select a path. If none supplied 'workdir/happ' will be taken instead",
            },
            {
                value: '',
                prompt: 'ID for the installed app. This is just a string to identify the app [default: test-app]'
            },
            {
                value: '',
                prompt: ` You may optionally specify app interface ports to bind when running. This allows your UI to talk to the
                conductor.
                
                For example, "0,9000,0" will create three app interfaces. Or, specify nothing to run
                without attaching any app interfaces.`},
            {
                value: '',
                prompt: `Number of conductor sandboxes to create [default:1]`
            },
            {
                value: '',
                prompt: `Set a root directory for conductor sandboxes to be placed into. Defaults to the system's temp directory. This directory must already exist.`
            }
        ] as HcCommandInput[];
        let params = await displayTextBoxCommand(def);
        getActiveTerminal().sendText(`hc sandbox generate ${params[0] == '' ? 'workdir/dna' : params[0]} ${params[1] == '' ? '' : `--app-id=${params[1]}`} ${params[2] == '' ? '' : `--run=${params[2]}`} ${params[3] == '' ? '' : `--num-sandboxes=${params[3]}`} ${params[4] == '' ? '' : `--root=${params[4]}`}`)



    }
}
