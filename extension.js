// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

const insertText = (val) => {
	const editor = vscode.window.activeTextEditor;

	if (!editor) {
			vscode.window.showErrorMessage('Can\'t insert log because no document is open');
			return;
	}
	const selection = editor.selection;
	const range = new vscode.Range(selection.start, selection.end);
	editor.edit((editBuilder) => {
			editBuilder.replace(range, val);
	});
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "plugin-console" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('console.insert', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from 张大伟!');
		const editor = vscode.window.activeTextEditor;
		if (!editor) { return; }

		const selection = editor.selection;
		const text = editor.document.getText(selection);

		const colors = ['MidnightBlue', 'Aquamarine', "LightPink", "DeepPink", "Orchid", "Indigo", "CornflowerBlue", "MediumSpringGreen", "Yellow", "DarkOrange", "DarkGray"];
		let color = colors[Math.floor(Math.random() * colors.length)];
		let backgroundColor = colors[Math.floor(Math.random() * colors.length)];
		if (color === backgroundColor) {
			color = colors[0];
			backgroundColor = colors[1];
		}

		const icons = ["🍏", "🍎", "🐶", "🐭", "❤️", "❤️", "👍", "🐘", "🌈", "🍌", "🌽", "🇨🇳", "💻"];
		const icon = icons[Math.floor(Math.random() * icons.length)];
	
		text ? vscode.commands.executeCommand('editor.action.insertLineAfter')
		.then(() => {
			const str = `${text}`.replace(/\'|\"/g,'');
			const logToInsert = `console.log('%c ${icon}${str}${icon}:', 'color: ${color}; background: ${backgroundColor}; font-size: 20px;', ${text});`;
			insertText(logToInsert);
		})
		: insertText(`console.log('%c ${icon}嘿嘿${Math.floor(Math.random()*100)}${icon}:', 'color: ${color}; background: ${backgroundColor}; font-size: 20px;', )`);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
