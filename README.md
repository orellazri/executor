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

## Development

`pnpm watch`

Run and debug in VSCode
