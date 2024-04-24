import type { Account } from "./Account";

export type SavedStore = {
  accounts: Account[];
  auth: {
    url: string,
    expiresAt: number
  }
};
