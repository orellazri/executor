import * as path from "path";
import * as vscode from "vscode";

type Config = {
  command: string;
};

export function activate(context: vscode.ExtensionContext) {
  let terminal: vscode.Terminal;

  let disposable = vscode.commands.registerCommand("executor.executeCommand", async () => {
    if (!vscode.workspace.workspaceFolders) {
      return;
    }

    try {
      // read config json file
      let configPath = path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, "executor.json");
      let doc = await vscode.workspace.openTextDocument(configPath);
      let config: Config = JSON.parse(doc.getText());
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
    } catch (e: any) {
      vscode.window.showInformationMessage("Executor error: " + e.message);
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
