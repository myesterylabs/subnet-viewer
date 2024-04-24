import auth from "./modules/authentication/axios/actionCreator";
import { createStore } from "vuex";
import ecommerce from "./modules/ecommerce/product/actionCreator";
import orders from "./modules/ecommerce/orders/actionCreator";
import server from "./modules/server/actionCreator";
import themeLayout from "./modules/themeLayout/actionCreator";
export default createStore({
  modules: {
    themeLayout,
    auth,
    ecommerce,
    orders,
     server,
  },
});
