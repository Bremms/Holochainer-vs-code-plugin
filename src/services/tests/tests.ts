import { getActiveTerminal, getRootOfVsCodeExtension, getTemplateFile } from "../shared/helpers";
import { ICommand } from "../shared/ICommand";
import * as vscode from 'vscode';
import { TextEncoder } from "util";
export class InitTests implements ICommand {
    name = "holochainer.tests.init";
    execute = async () => {
        const wsedit = new vscode.WorkspaceEdit();
        if (vscode.workspace.workspaceFolders == undefined) {
          vscode.window.showInformationMessage('Open a workspace to create the test directories');
          return;
        }
        const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath; // gets the path of the first workspace folder
        const filePath = vscode.Uri.file(wsPath + '/tests/src');
        var testsPath = wsPath + '\\tests';
        let textEncoder = new TextEncoder();
        const tsconfigPath = vscode.Uri.file(wsPath + "/tests/tsconfig.json");
        const packageJsonPath = vscode.Uri.file(wsPath + "/tests/package.json");
        const defaultTestFilePath = vscode.Uri.file(wsPath + "/tests/src/index.ts");
        vscode.workspace.fs.createDirectory(filePath);
        vscode.workspace.fs.writeFile(tsconfigPath,textEncoder.encode(tsconfigFile));
        vscode.workspace.fs.writeFile(packageJsonPath,textEncoder.encode(packageJsonFile));
        vscode.workspace.fs.writeFile(defaultTestFilePath,textEncoder.encode(defaultTestFile));
        getActiveTerminal().sendText(`cd ${testsPath}`);
        getActiveTerminal().sendText(`npm install`);
    }
  }

  let tsconfigFile = `{
    "compilerOptions": {
      "target": "es5",
      "module": "commonjs",
      "resolveJsonModule": true,
      "strict": true,
      "noImplicitAny": false,
      "esModuleInterop": true,
      "skipLibCheck": true,
      "forceConsistentCasingInFileNames": true
    }
  }`;
  let packageJsonFile =`{
    "name": "hello-integration-tests",
    "version": "0.0.1",
    "description": "An integration test runner using Tryorama",
    "main": "index.js",
    "scripts": {
      "test": "TRYORAMA_LOG_LEVEL=info RUST_LOG=error RUST_BACKTRACE=1 TRYORAMA_HOLOCHAIN_PATH=\\"holochain\\" ts-node src/index.ts"
    },
    "author": "Keen Holo Dev",
    "license": "ISC",
    "dependencies": {
      "@holochain/tryorama": "0.4.1",
      "@msgpack/msgpack": "^2.5.1",
      "@types/lodash": "^4.14.168",
      "@types/node": "^14.14.37",
      "lodash": "^4.17.21",
      "tape": "^5.2.2",
      "ts-node": "^9.1.1",
      "typescript": "^4.2.3"
    }
  }`
  let defaultTestFile = `import path from "path";
  import { Orchestrator, Config, InstallAgentsHapps } from "@holochain/tryorama";
  //Based on this tutorial: https://hackmd.io/rNCiNe_zQ7aT3oKEl8UCqQ
  
  // Create a configuration for our conductor
  const conductorConfig = Config.gen();
  
  // Construct proper paths for your DNAs
  const dnaPath = path.join(__dirname, "../../workdir/dna/greeter.dna");
  
  // create an InstallAgentsHapps array with your DNAs to tell tryorama what
  // to install into the conductor.
  const installation: InstallAgentsHapps = [
    // agent 0
    [
      // happ 0
      [dnaPath],
    ],
  ];
  
  const orchestrator = new Orchestrator();
  
  orchestrator.registerScenario("holo says hello", async (s, t) => {
    const [alice] = await s.players([conductorConfig]);
  
    // install your happs into the coductors and destructuring the returned happ data using the same
    // array structure as you created in your installation array.
    const [[alice_common]] = await alice.installAgentsHapps(installation);
  
    let result = await alice_common.cells[0].call("greeter", "say_greeting", {
      content: "Hello Holo Dev",
    });
    
    t.ok(result);
  });
  
  orchestrator.run();`