import auth from "./modules/authentication/axios/actionCreator";
import { createStore } from "vuex";
import server from "./modules/server/actionCreator";
import themeLayout from "./modules/themeLayout/actionCreator";
;
export default createStore({
  modules: {
    themeLayout,
    auth,
     server,
  },
});
