import * as path from "path";
import * as vscode from "vscode";

type Config = {
  command?: string;
  commands?: string[];
};

export function activate(context: vscode.ExtensionContext) {
  let terminal: vscode.Terminal | undefined;

  let disposable = vscode.commands.registerCommand("executor.executeCommand", async () => {
    try {
      if (!vscode.workspace.workspaceFolders) {
        throw new Error("No workspace found");
      }

      // read config json file
      let configPath = path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, "executor.json");
      let doc = await vscode.workspace.openTextDocument(configPath);
      let config: Config = JSON.parse(doc.getText());

      // validate config file
      if ((!config.command && !config.commands) || (config.command && config.commands)) {
        throw new Error("Invalid config file");
      }
      if ((config.command && typeof config.command !== "string") || (config.commands && typeof config.commands != "object")) {
        throw new Error("Invalid config file");
      }

      // choose command to execute (single or let user select from choices)
      let command = "";
      if (config.command) {
        command = config.command;
      } else if (config.commands) {
        const quickPickResult = await vscode.window.showQuickPick(config.commands, { title: "Choose a command to execute" });
        command = quickPickResult || "";
      }

      if (command === "") {
        return;
      }

      // close terminal if exists, create new one and execute command
      if (terminal) {
        terminal.dispose();
      }
      terminal = vscode.window.createTerminal("Executor");
      terminal.show();
      terminal.sendText(command);
    } catch (e: any) {
      if (e.message.includes("nonexistent file")) {
        e.message = 'Config file "executor.json" not found';
      }
      vscode.window.showInformationMessage("Executor error: " + e.message);
    }
  });

  context.subscriptions.push(disposable);
}
