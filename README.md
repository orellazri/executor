# Executor

Executor is a VSCode extension that lets you run custom commands (scoped to a project)

## Usage

In your workspace directory, create a file named `executor.json` with the following content:

```json
{
  "command": "..."
}
```

And replace `...` with the command you with to run. For example, `cargo run`

To run the command, use the command palette (Ctrl + Shift + P) and choose "Executor: Execute command". It's recommended to bind this to a keyboard shortcut for easier use.

## Development

`pnpm watch`

Run and debug in VSCode
