import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { npmInstallConductor } from '../../services/javascript/javascript';
import { MockFactory, MockTerminal } from './dummy/dummyVsCodeService';
// import * as myExtension from '../../extension';

suite('Javscript Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('js conductor install right package', async () => {
		var vscodeMock = MockFactory.getVsCodeServiceMock();
		var jsConductor = new npmInstallConductor(vscodeMock);
		
		await jsConductor.execute()
		var terminal  = vscodeMock.getActiveTerminal(false) as MockTerminal
		//Verify app init command. The command should always be executed on the workspaceRoot
		var cmdBuffer = terminal.textBuffer;
		var ws = vscodeMock.getWorkspace();
		assert.strictEqual(cmdBuffer[0],`npm install @holochain/conductor-api`);
	});
});
