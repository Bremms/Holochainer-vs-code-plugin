import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { AppInit } from '../../services/hc/app';
// import * as myExtension from '../../extension';

suite('Hc Test Suite', () => {
	vscode.window.showInformationMessage('Start hc tests');

	test('Hc app init tests', async () => {
		// var appInitCmd = new AppInit();
		// await appInitCmd.execute({answers : ["zomeTest","y"]});

	});
});
