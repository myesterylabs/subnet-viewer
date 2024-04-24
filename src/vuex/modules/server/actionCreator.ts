import mutations from './mutations';

const state = () => ({
  fetchingWallets: false,
  fetchingSubnets: false,
  fetchingDefaultWallet: false,
  
  wallets: [],
  subnets: [],
  defaultWallet: null,
  
  error: null,
});

const actions = {
  async getWallets({ commit }: { commit: any }) {
    try {
      commit('fetchingWallets');
      const wallets = await window.api.getWallets()
      commit('fetchWalletsSuccess', wallets);
    } catch (err) {
      commit('fetchWalletsErr', err);
    }
  },
  
  async getSubnets({ commit }: { commit: any }) {
    try {
      commit('fetchingSubnets');
      const subnets = await window.api.getSubnets()
      commit('fetchSubnetsSuccess', subnets);
    } catch (err) {
      commit('fetchSubnetsErr', err);
    }
  },
  
  async getDefaultWallet({ commit }: { commit: any }) {
    try {
      commit('fetchingDefaultWallet');
      const defaultWallet = await window.api.getDefaultWallet()
      commit('fetchDefaultWalletSuccess', defaultWallet);
    } catch (err) {
      commit('fetchDefaultWalletErr', err);
    }
  },

};

export default {
  namespaced: false,
  state,
  actions,
  mutations,
};
