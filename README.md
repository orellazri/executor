# Executor

Executor is a VSCode extension that lets you run custom commands (scoped to a project)

## Usage

In your workspace directory, create a file named `executor.json` with the following content:

```json
{
  "command": "..."
}
```

or for multiple commands:

```
{
  "command": ["...", "..."]
}
```

And replace `...` with the command/s you with to run. For example, `cargo run`

To run the commands, use the command palette (Ctrl + Shift + P) and choose "Executor: Execute command". It's recommended to bind this to a keyboard shortcut for easier use.

When you specify a single command in `executor.json`, that command will instantly run. Otherwise, you will be prompted to choose a command from the commands you specified.

## Development

`yarn watch`

Run and debug in VSCode
