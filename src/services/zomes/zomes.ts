import { HcCommandInput, ICommand } from "../shared/ICommand";
import * as vscode from 'vscode';
import { TextEncoder } from "util";
import * as fs from 'fs';
import { defaultCargo, defaultRootCargo, defaultZome } from "../../templates/templateStore";
import { inject, injectable } from "inversify";
import TYPES from "../../dependencyInjection/types";
import { IVsCodeService } from "../shared/vscodeService";
import { sleep } from "../shared/helpers";
var toml = require('toml');
var json2toml = require('json2toml');

@injectable()
export class initZome implements ICommand {
  constructor(@inject(TYPES.IVsCodeService) private vscodeService: IVsCodeService) { };

  name = "holochainer.zomes.init";
  execute = async (args: any) => {

    const wsPath = this.vscodeService.getWorkspace();
    let zomesPath = vscode.Uri.file(`${wsPath}/zomes`);
    await vscode.workspace.fs.createDirectory(zomesPath);
    var createCmd = new createZome(this.vscodeService);

    await createCmd.execute({ path: zomesPath.path, answers: [null, "y"] });
    vscode.window.showInformationMessage('Zome directory intialized');
  }
}
@injectable()
export class createZome implements ICommand {
  constructor(@inject(TYPES.IVsCodeService) private vscodeService: IVsCodeService) { };

  name = "holochainer.zomes.create";
  execute = async (args: any) => {

    const wsPath = this.vscodeService.getWorkspace();

    var folderClicked = args.path;
    const def = [
      {
        value: '',
        prompt: "How do you want to call your zome?",
      },
      {
        value: '',
        prompt: "Is this your first zome (y/n)? If y it will create a Cargo.toml for all zomes",
      },
    ] as HcCommandInput[];
    let textEncoder = new TextEncoder();

    let params = await this.vscodeService.displayTextBoxCommand(def, args.answers);
    var [zomeName, firstZome] = params;
    if (zomeName == undefined || zomeName == '') zomeName = "zome";

    //Define all paths to create file
    let rootPath = vscode.Uri.file(folderClicked);
    let zomeFolder = rootPath.path.split("/")[rootPath.path.split("/").length - 1];
    let rootCargoDir = vscode.Uri.file(`${wsPath}/Cargo.toml`);
    let srcPath = vscode.Uri.file(`${folderClicked}/${zomeName}/src`);
    let zomeFilePath = vscode.Uri.file(`${folderClicked}/${zomeName}/src/lib.rs`);
    let cargoDefaultFilePath = vscode.Uri.file(`${folderClicked}/${zomeName}/Cargo.toml`);

    //Create the directories and files
    await vscode.workspace.fs.createDirectory(srcPath);
    await vscode.workspace.fs.writeFile(zomeFilePath, textEncoder.encode(defaultZome));
    await vscode.workspace.fs.writeFile(cargoDefaultFilePath, textEncoder.encode(defaultCargo.replace(/{zome_name}/g, zomeName)));
    this.vscodeService.openFileInEditor(zomeFilePath.path);

    if (firstZome?.toLowerCase() == "y") {
      await vscode.workspace.fs.writeFile(rootCargoDir, textEncoder.encode(defaultRootCargo.replace(/{zome_folder}/g, zomeFolder).replace(/{zome_name}/g, zomeName)));

    } else {
      //Not the first zome. Check if there is a cargo.toml on the root dir
      await this.tryAddZomeToCargoDef(rootCargoDir, `${zomeFolder}/${zomeName}`);
    }


    vscode.window.showInformationMessage(`Zome '${zomeName}' created `);

  }
  private tryAddZomeToCargoDef = async (rootCargoDir: vscode.Uri, zomePath: string) => {
    console.log("Try add zome");
    if (fs.existsSync(rootCargoDir.fsPath)) {
      console.log("Default cargo exist");

      //vscode sometimes didn't show the inputbox.
      //When delaying this issue wasn't present. Temporary fix needs investing [TODO]
      await sleep(500);
      let val = await vscode.window.showInputBox({ value: '', prompt: 'Add to root Cargo.toml? (y/n)' });
      console.log(`Result windows ${val}`);

      if (val?.toLowerCase() == "y") {
        try {
          //Open the toml file
          let defaultCargoToml = await vscode.workspace.openTextDocument(rootCargoDir);
          var cargoContent = toml.parse(defaultCargoToml.getText());
          //Push the zomepath into the workspace/members property
          cargoContent.workspace.members.push(zomePath);

          //Convert the json obj to toml, write the file and open the file in the editor
          var tomlNewContent = json2toml(cargoContent,
            { indent: 2, newlineAfterSection: true });
          let textEncoder = new TextEncoder();
          await vscode.workspace.fs.writeFile(rootCargoDir, textEncoder.encode(tomlNewContent));
          this.vscodeService.openFileInEditor(rootCargoDir.fsPath)

        } catch (err) {
          vscode.window.showErrorMessage('Failed to write to the default cargo.toml file. ');
        }
      }
    }
  }
}
