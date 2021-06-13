import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { AppInit } from '../../services/hc/app';
import { DnaInit } from '../../services/hc/dna';
import { sleep } from '../../services/shared/helpers';
import { MockFactory, MockTerminal } from './dummy/dummyVsCodeService';
// import * as myExtension from '../../extension';

suite('Hc dna test ', () => {

	test('Dna init test should take workdir/happ when no answer provided', async () => {
		var vscodeMock = MockFactory.getVsCodeServiceMock();
		var dnaInit = new DnaInit(vscodeMock);
		
		await dnaInit.execute({answers : [""]})
		var terminal  = vscodeMock.getActiveTerminal(false) as MockTerminal
		//Verify app init command. The command should always be executed on the workspaceRoot
		var cmdBuffer = terminal.textBuffer;
		var ws = vscodeMock.getWorkspace();
		assert.strictEqual(cmdBuffer[0],`cd ${ws}`);
		//Verify actual commando
		assert.strictEqual(cmdBuffer[1],`hc dna init workdir/dna`);
	});
	
	test('Hc dna init should take path provided by the user', async () => {
		var vscodeMock = MockFactory.getVsCodeServiceMock();
		var dnaInit = new DnaInit(vscodeMock);
		
		await dnaInit.execute({answers : ["my_custom_path/test"]})
		var terminal  = vscodeMock.getActiveTerminal(false) as MockTerminal
		//Verify app init command. The command should always be executed on the workspaceRoot
		var cmdBuffer = terminal.textBuffer;
		var ws = vscodeMock.getWorkspace();
		assert.strictEqual(cmdBuffer[0],`cd ${ws}`);
		//Verify actual commando
		assert.strictEqual(cmdBuffer[1],`hc dna init my_custom_path/test`);
	});
});
