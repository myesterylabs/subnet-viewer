import type { Account } from "@/types/Account";

export default {
  loginBegin(state: any) {
    state.loading = true;
  },
  loginSuccess(state: any, data: any) {
    state.loading = false;
    state.account = data;
  },

  loginErr(state: any, err: any) {
    state.loading = false;
    state.error = err;
  },

  logoutBegin(state: any) {
    state.loading = true;
  },

  logoutSuccess(state: any, data: any) {
    state.loading = false;
    state.account = data;
  },

  logoutErr(state: any, err: any) {
    state.loading = false;
    state.error = err;
  },
  
  setAccounts(state: any, accounts: Account[]) {
    state.accounts = accounts;
  }
};
