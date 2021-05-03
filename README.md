# Holochainer-vs-code-plugin
## Vscode plugin for holochain RSM 0.0.1


This plugin uses the directory and file structures defined in https://hackmd.io/rNCiNe_zQ7aT3oKEl8UCqQ / HolochainGym (https://holochain-gym.github.io/developers/basic/entries/)

Follow the document to setup holochain and nix.



## Installation
Install the extension in vscode

## Features
Command palette commando's

> Enter the nix-shell (nix-shell .)
```sh
 Holo nix shell
```

> Creates a default.nix file in the root dir
```sh
 Holo nix create
```

> Compiles wasm (CARGO_TARGET_DIR=target cargo build --release --target wasm32-unknown-unknown)
```sh
 Holo Compile wasm
```

> Build the dna file (hc dna init)
```sh
 Holo dna init
```

> Package the WASM into a DNA file (hc dna pack)
```sh
 Holo dna pack
```

>  Unpack the parts of `.dna` file out into a directory. (hc dna unpack)
```sh
 Holo dna unpack
```

> Create a new, empty Holochain app (hApp) working directory (hc app init)
```sh
 Holo app init
```
> Pack the contents of a directory into a `.happ` bundle file. (hc app pack)
```sh
 Holo app pack
```
> Unpacks the parts of `.happ` file out into a directory. (hc app unpack)
```sh
 Holo app unpack
```
>  Initializes typescript tests
```sh
 Holo tests init
```
> Initialize the zomes working directory
```sh
 Holo zomes init
```
> Deploy the hApp to a local sandbox Holochain by running this in your nix-shell (hc sandbox generate)
```sh
Holo sandbox generate
```
> Installs the conductor-api into the directory the user currently is in (npm install @holochain/conductor-api)
```sh
Holo install npm package holochain/conductor-api
```
Explorer

> Zome create - Right-click on a folder the item 'Create a new zome' will pop up.
