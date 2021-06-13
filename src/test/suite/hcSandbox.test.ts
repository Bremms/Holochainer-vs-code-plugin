import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { AppInit } from '../../services/hc/app';
import { SandboxGenerate } from '../../services/hc/sandbox';
import { sleep } from '../../services/shared/helpers';
import { MockFactory, MockTerminal } from './dummy/dummyVsCodeService';
// import * as myExtension from '../../extension';

suite('Hc Sandbox test,', () => {

	test('path should be workdir/happ when no path is supplied', async () => {
        var vscodeMock = MockFactory.getVsCodeServiceMock();
		var appInit = new SandboxGenerate(vscodeMock);
		
		await appInit.execute({answers : ["","","","",""]})
		var terminal  = vscodeMock.getActiveTerminal(false) as MockTerminal
		//Verify app init command. The command should always be executed on the workspaceRoot
		var cmdBuffer = terminal.textBuffer;
		var cmd = cmdBuffer[0];
		//Verify actual commando
		assert.strictEqual(cmd.trim(),`hc sandbox generate workdir/happ`);
	});
	test('path should take wathever the user filled in', async () => {
        var vscodeMock = MockFactory.getVsCodeServiceMock();
		var appInit = new SandboxGenerate(vscodeMock);
		
		await appInit.execute({answers : ["tesDir","","","",""]})
		var terminal  = vscodeMock.getActiveTerminal(false) as MockTerminal
		//Verify app init command. The command should always be executed on the workspaceRoot
		var cmdBuffer = terminal.textBuffer;
		var cmd = cmdBuffer[0];
		//Verify actual commando
		assert.strictEqual(cmd.trim(),`hc sandbox generate tesDir`);
	});
	test('path should be workdir/happ appId filled in', async () => {
        var vscodeMock = MockFactory.getVsCodeServiceMock();
		var appInit = new SandboxGenerate(vscodeMock);
		
		await appInit.execute({answers : ["","holoApp","","",""]})
		var terminal  = vscodeMock.getActiveTerminal(false) as MockTerminal
		//Verify app init command. The command should always be executed on the workspaceRoot
		var cmdBuffer = terminal.textBuffer;
		var cmd = cmdBuffer[0];
		//Verify actual commando
		assert.strictEqual(cmd.trim(),`hc sandbox generate workdir/happ --app-id=holoApp`);
	});
	test('the run param can be specified to run on other instances', async () => {
        var vscodeMock = MockFactory.getVsCodeServiceMock();
		var appInit = new SandboxGenerate(vscodeMock);
		
		await appInit.execute({answers : ["","","9000","",""]})
		var terminal  = vscodeMock.getActiveTerminal(false) as MockTerminal
		//Verify app init command. The command should always be executed on the workspaceRoot
		var cmdBuffer = terminal.textBuffer;
		var cmd = cmdBuffer[0];
		//Verify actual commando
		assert.strictEqual(cmd.trim(),`hc sandbox generate workdir/happ  --run=9000`);
	});
});
