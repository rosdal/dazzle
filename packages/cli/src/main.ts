import { type CommandDef, defineCommand, renderUsage, runCommand } from "citty";

export interface CliIO {
  stdout: (line: string) => void;
  stderr: (line: string) => void;
}

export const defaultIO: CliIO = {
  stdout: (line) => console.log(line),
  stderr: (line) => console.error(line),
};

/** Subcommands and their one-line descriptions. Each one is a stub until its todo lands. */
export const COMMANDS = {
  init: "Set up Dazzle in a Vite project",
  studio: "Open the design studio",
  check: "Run design checks",
  mcp: "Start the MCP server",
  add: "Add a recipe to the project",
  frames: "Capture frames of the site",
  tokens: "Read or write design tokens",
  story: "Generate a design story",
} as const;

export type CommandName = keyof typeof COMMANDS;

/** Run the CLI with the given arguments and return the process exit code. */
export async function runCli(
  argv: string[],
  version: string,
  io: CliIO = defaultIO,
): Promise<number> {
  let exitCode = 0;
  const stub = (name: CommandName): CommandDef =>
    defineCommand({
      meta: { name, description: COMMANDS[name] },
      run() {
        io.stderr(`dazzle ${name}: not implemented yet`);
        exitCode = 1;
      },
    });
  const subCommands: Record<string, CommandDef> = Object.fromEntries(
    (Object.keys(COMMANDS) as CommandName[]).map((name) => [name, stub(name)]),
  );
  const main = defineCommand({
    meta: {
      name: "dazzle",
      version,
      description: "Design levers, a studio and checks for original sites built with Claude Code.",
    },
    subCommands,
  });

  if (argv.length === 1 && (argv[0] === "--version" || argv[0] === "-v")) {
    io.stdout(version);
    return 0;
  }
  const name = argv[0] ?? "";
  // `Object.hasOwn`, so `constructor` or `toString` never count as commands.
  const sub = Object.hasOwn(subCommands, name) ? subCommands[name] : undefined;
  if (argv.length === 0 || argv.includes("--help") || argv.includes("-h")) {
    io.stdout(sub ? await renderUsage(sub, main) : await renderUsage(main));
    return 0;
  }
  if (!sub) {
    io.stderr(`Unknown command: ${name}. Run dazzle --help for the list.`);
    return 1;
  }
  await runCommand(main, { rawArgs: argv });
  return exitCode;
}
