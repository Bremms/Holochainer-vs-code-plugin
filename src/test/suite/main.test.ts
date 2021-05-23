import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { sleep } from '../../services/shared/helpers';
// import * as myExtension from '../../extension';

suite('Main Test Suite', () => {
	vscode.window.showInformationMessage('Should start extension holochainer');

	test('extension holochainer should be installed', async () => {
		
        // vscode.commands.executeCommand("holochainer.app.init");
        const started = vscode.extensions.getExtension(
			"bremzor.holochainer",
		);
        assert.notStrictEqual(started, undefined);
	});
});
