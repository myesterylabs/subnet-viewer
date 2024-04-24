export default {
  fetchingWallets(state: any) {
    state.fetchingWallets = true;
  },

  fetchWalletsSuccess(state: any, data: any) {
    state.fetchingWallets = false;
    state.wallets = data;
  },

  fetchWalletsErr(state: any, err: any) {
    state.fetchingWallets = false;
    state.error = err;
  },

  fetchingSubnets(state: any) {
    state.fetchingSubnets = true;
  },

  fetchSubnetsSuccess(state: any, data: any) {
    state.fetchingSubnets = false;
    state.subnets = data;
  },

  fetchSubnetsErr(state: any, err: any) {
    state.fetchingSubnets = false;
    state.error = err;
  },

  fetchingDefaultWallet(state: any) {
    state.fetchingDefaultWallet = true;
  },

  fetchDefaultWalletSuccess(state: any, data: any) {
    state.fetchingDefaultWallet = false;
    // strip " and / from the address
    state.defaultWallet = data.replace(/"/g, "").replace(/\//g, "");
  },

  fetchDefaultWalletErr(state: any, err: any) {
    state.fetchingDefaultWallet = false;
    state.error = err;
  },
};
