import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { AppInit, AppPack, AppUnPack } from '../../services/hc/app';
import { MockFactory, MockTerminal } from './dummy/dummyVsCodeService';
// import * as myExtension from '../../extension';

suite('Hc App Test Suite', () => {

	test('Hc app init should take workdir/happ when no answer provided', async () => {
		var vscodeMock = MockFactory.getVsCodeServiceMock();
		var appInit = new AppInit(vscodeMock);
		
		await appInit.execute({answers : [""]})
		var terminal  = vscodeMock.getActiveTerminal(false) as MockTerminal
		//Verify app init command. The command should always be executed on the workspaceRoot
		var cmdBuffer = terminal.textBuffer;
		var ws = vscodeMock.getWorkspace();
		assert.strictEqual(cmdBuffer[0],`cd ${ws}`);
		//Verify actual commando
		assert.strictEqual(cmdBuffer[1],`hc app init workdir/happ`);
	});

	test('Hc app init should take path provided by the user', async () => {
		var vscodeMock = MockFactory.getVsCodeServiceMock();
		var appInit = new AppInit(vscodeMock);
		
		await appInit.execute({answers : ["my_custom_path/test"]})
		var terminal  = vscodeMock.getActiveTerminal(false) as MockTerminal
		//Verify app init command. The command should always be executed on the workspaceRoot
		var cmdBuffer = terminal.textBuffer;
		var ws = vscodeMock.getWorkspace();
		assert.strictEqual(cmdBuffer[0],`cd ${ws}`);
		//Verify actual commando
		assert.strictEqual(cmdBuffer[1],`hc app init my_custom_path/test`);
	});

	test('Hc app pack should take workdir/happ if nothing provided', async () => {
		var vscodeMock = MockFactory.getVsCodeServiceMock();
		var appPack = new AppPack(vscodeMock);
		
		await appPack.execute({answers : ["",""]})
		var terminal  = vscodeMock.getActiveTerminal(false) as MockTerminal
		//Verify app pack command. The command should always be executed on the workspaceRoot
		var cmdBuffer = terminal.textBuffer;
		var ws = vscodeMock.getWorkspace();
		assert.strictEqual(cmdBuffer[0],`cd ${ws}`);
		//Verify actual commando
		assert.strictEqual(cmdBuffer[1],`hc app pack  workdir/happ`);
	});

	test('Hc app pack should take workdir/happ if nothing provided', async () => {
		var vscodeMock = MockFactory.getVsCodeServiceMock();
		var appPack = new AppPack(vscodeMock);
		
		await appPack.execute({answers : ["",""]})
		var terminal  = vscodeMock.getActiveTerminal(false) as MockTerminal
		//Verify app pack command. The command should always be executed on the workspaceRoot
		var cmdBuffer = terminal.textBuffer;
		var ws = vscodeMock.getWorkspace();
		assert.strictEqual(cmdBuffer[0],`cd ${ws}`);
		//Verify actual commando
		//2 spaces, ugly. but it works
		assert.strictEqual(cmdBuffer[1],`hc app pack  workdir/happ`);
	});
	test('Hc app pack should take path provided by the user', async () => {
		var vscodeMock = MockFactory.getVsCodeServiceMock();
		var appPack = new AppPack(vscodeMock);
		
		await appPack.execute({answers : ["yolo/swag",""]})
		var terminal  = vscodeMock.getActiveTerminal(false) as MockTerminal
		//Verify app pack command. The command should always be executed on the workspaceRoot
		var cmdBuffer = terminal.textBuffer;
		var ws = vscodeMock.getWorkspace();
		assert.strictEqual(cmdBuffer[0],`cd ${ws}`);
		//Verify actual commando
		assert.strictEqual(cmdBuffer[1],`hc app pack  yolo/swag`);
	});

	test('Hc app pack with outputdir suplied should add fill in the -o param', async () => {
		var vscodeMock = MockFactory.getVsCodeServiceMock();
		var appPack = new AppPack(vscodeMock);
		
		await appPack.execute({answers : ["yolo/swag","testout"]})
		var terminal  = vscodeMock.getActiveTerminal(false) as MockTerminal
		//Verify app pack command. The command should always be executed on the workspaceRoot
		var cmdBuffer = terminal.textBuffer;
		var ws = vscodeMock.getWorkspace();
		assert.strictEqual(cmdBuffer[0],`cd ${ws}`);
		//Verify actual commando
		assert.strictEqual(cmdBuffer[1],`hc app pack -o testout yolo/swag`);
	});

	test('Hc app unpack with outputdir suplied should add fill in the -o param', async () => {
		var vscodeMock = MockFactory.getVsCodeServiceMock();
		var appPack = new AppUnPack(vscodeMock);
		
		await appPack.execute({answers : ["yolo/swag","testout"]})
		var terminal  = vscodeMock.getActiveTerminal(false) as MockTerminal
		//Verify app pack command. The command should always be executed on the workspaceRoot
		var cmdBuffer = terminal.textBuffer;
		var ws = vscodeMock.getWorkspace();
		assert.strictEqual(cmdBuffer[0],`cd ${ws}`);
		//Verify actual commando
		assert.strictEqual(cmdBuffer[1],`hc app unpack -o testout yolo/swag`);
	});
	test('Hc app unpack should take path provided by the user', async () => {
		var vscodeMock = MockFactory.getVsCodeServiceMock();
		var appPack = new AppUnPack(vscodeMock);
		
		await appPack.execute({answers : ["yolo/swag",""]})
		var terminal  = vscodeMock.getActiveTerminal(false) as MockTerminal
		//Verify app pack command. The command should always be executed on the workspaceRoot
		var cmdBuffer = terminal.textBuffer;
		var ws = vscodeMock.getWorkspace();
		assert.strictEqual(cmdBuffer[0],`cd ${ws}`);
		//Verify actual commando
		assert.strictEqual(cmdBuffer[1],`hc app unpack  yolo/swag`);
	});
	test('Hc app unpack should take workdir/happ if nothing provided', async () => {
		var vscodeMock = MockFactory.getVsCodeServiceMock();
		var appPack = new AppUnPack(vscodeMock);
		
		await appPack.execute({answers : ["",""]})
		var terminal  = vscodeMock.getActiveTerminal(false) as MockTerminal
		//Verify app pack command. The command should always be executed on the workspaceRoot
		var cmdBuffer = terminal.textBuffer;
		var ws = vscodeMock.getWorkspace();
		assert.strictEqual(cmdBuffer[0],`cd ${ws}`);
		//Verify actual commando
		//2 spaces, ugly. but it works
		assert.strictEqual(cmdBuffer[1],`hc app unpack  workdir/happ`);
	});
}); 
