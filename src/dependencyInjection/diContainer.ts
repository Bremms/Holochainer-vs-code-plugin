import 'reflect-metadata';

import { Container } from 'inversify';
import TYPES from './types';
import { IVsCodeService, VsCodeService } from '../services/shared/vscodeService';
import { ICommand } from '../services/shared/ICommand';
import { AppInit, AppPack, AppUnPack } from '../services/hc/app';
import { Holochainer } from '../services/holochainerService';
import { DnaInit, DnaPack, DnaUnPack } from '../services/hc/dna';
import { SandboxGenerate } from '../services/hc/sandbox';
import { createDefaultNix, enterNix } from '../services/nix/nix';
import { compileToWasm } from '../services/wasm/wasm';
import { InitTests } from '../services/tests/tests';
import { createZome, initZome } from '../services/zomes/zomes';
import { npmInstallConductor } from '../services/javascript/javascript';

const container = new Container();
container.bind<IVsCodeService>(TYPES.IVsCodeService).to(VsCodeService);
container.bind<ICommand>(TYPES.ICommand).to(AppInit);
container.bind<ICommand>(TYPES.ICommand).to(AppPack);
container.bind<ICommand>(TYPES.ICommand).to(AppUnPack);
container.bind<ICommand>(TYPES.ICommand).to(DnaInit);
container.bind<ICommand>(TYPES.ICommand).to(DnaPack);
container.bind<ICommand>(TYPES.ICommand).to(DnaUnPack);
container.bind<ICommand>(TYPES.ICommand).to(SandboxGenerate);
container.bind<ICommand>(TYPES.ICommand).to(enterNix);
container.bind<ICommand>(TYPES.ICommand).to(createDefaultNix);
container.bind<ICommand>(TYPES.ICommand).to(compileToWasm);
container.bind<ICommand>(TYPES.ICommand).to(InitTests);
container.bind<ICommand>(TYPES.ICommand).to(createZome);
container.bind<ICommand>(TYPES.ICommand).to(npmInstallConductor);
container.bind<ICommand>(TYPES.ICommand).to(initZome);
container.bind<Holochainer>(TYPES.Holochainer).to(Holochainer);
// container.bind<Command>(TYPES.Command).to(AddCommand);
// container.bind<Command>(TYPES.Command).to(RemoveCommand);
// container.bind<CommandsManager>(TYPES.CommandManager).to(CommandsManager);

export default container;