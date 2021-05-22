

const defaultZome = `use hdk::prelude::*;

entry_defs![Greeting::entry_def()];

#[hdk_entry(id = "greeting")]
pub struct Greeting(String);

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct SomeExternalInput {
    content: String,
}

#[hdk_extern]
pub fn say_greeting(input: SomeExternalInput) -> ExternResult<String> {
  
  Ok(input.content)
}`

const defaultCargo = `
[package]
name = "{zome_name}"
version = "0.0.1"
authors = [ "[your name]", "[your email address]" ]
edition = "2018"

[lib]
name = "{zome_name}"
crate-type = [ "cdylib", "rlib" ]

[dependencies]
hdk = "0.0.100"
serde = "1"
holo_hash = "0.0.2-alpha"
`

const defaultRootCargo = `
[workspace]
members = [
  "{zome_folder}/{zome_name}",
]

[profile.dev]
opt-level = "z"

[profile.release]
opt-level = "z"
`
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
  let packageJsonFile = `{
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
  let defaultNixFileContent = `let
holonixPath = builtins.fetchTarball {
  url = "https://github.com/holochain/holonix/archive/90a19d5771c069dbcc9b27938009486b54b12fb7.tar.gz";
  sha256 = "11wv7mwliqj38jh1gda3gd0ad0vqz1d42hxnhjmqdp037gcd2cjg";
};
holonix = import (holonixPath) {
  includeHolochainBinaries = true;
  holochainVersionId = "custom";

  holochainVersion = {
   rev = "d3a61446acaa64b1732bc0ead5880fbc5f8e3f31";
   sha256 = "0k1fsxg60spx65hhxqa99nkiz34w3qw2q4wspzik1vwpkhk4pwqv";
   cargoSha256 = "0fz7ymyk7g3jk4lv1zh6gbn00ad7wsyma5r7csa88myl5xd14y68";
   bins = {
	 holochain = "holochain";
	 hc = "hc";
   };
  };
};
in holonix.main`