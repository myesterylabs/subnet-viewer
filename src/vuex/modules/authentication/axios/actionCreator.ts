import Cookies from "js-cookie";
import mutations from "./mutations";
import { type Account } from "@/types/Account";

const state = () => ({
  account: extractJSON(Cookies.get("account")),
  loading: false,
  error: null,
  accounts: [],
});

const extractJSON =( json: string| undefined) => {
  if (!json) {
    return null
  }
  return JSON.parse(json)
}

const actions = {
  async login({ commit }: { commit: any }, account: Account) {
    try {
      commit("loginBegin");
      // 5 days
      Cookies.set("account", JSON.stringify(account), {expires: 5});
      return commit("loginSuccess", true);
    } catch (err) {
      commit("loginErr", err);
    }
  },
  async logOut({ commit }: { commit: any }) {
    try {
      commit("logoutBegin");
      Cookies.remove("account");
      commit("logoutSuccess", null);
    } catch (err) {
      commit("logoutErr", err);
    }
  },
  
};

export default {
  namespaced: false,
  state,
  actions,
  mutations,
};
