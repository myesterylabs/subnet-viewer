export enum Commands {
  INSTALL_SOLANA = "INSTALL_SOLANA",
  CHECK_SOLANA_INSTALLATION = "CHECK_SOLANA_INSTALLATION",
  CHECK_RUST_INSTALLATION = "CHECK_RUST_INSTALLATION",
  INSTALL_RUST = "INSTALL_RUST",
}

export type Command = {
  command: Commands;
  channel: string;
  async: boolean;
};

export type CommandResult = Promise<CommandResultResolved>;

export type QueryResult<T> = Promise<{
  success: boolean;
  value: T;
}>;

export type CommandResultResolved = {
  stderr: string;
  stdout: string;
  success: boolean;
};
