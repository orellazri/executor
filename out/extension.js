"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const path = require("path");
const vscode = require("vscode");
function activate(context) {
    let terminal;
    let disposable = vscode.commands.registerCommand("executor.executeCommand", async () => {
        if (!vscode.workspace.workspaceFolders) {
            return;
        }
        try {
            // read config json file
            let configPath = path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, "executor.json");
            let doc = await vscode.workspace.openTextDocument(configPath);
            let config = JSON.parse(doc.getText());
            if (!config.command) {
                throw new Error("Invalid config file");
            }
            // create terminal if it's the first time
            if (!terminal) {
                terminal = vscode.window.createTerminal("Executor");
            }
            // send command to terminal
            terminal.show();
            terminal.sendText(config.command);
        }
        catch (e) {
            vscode.window.showInformationMessage("Executor error: " + e.message);
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map