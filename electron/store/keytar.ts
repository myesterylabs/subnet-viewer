// const keytar = require('keytar')
// const service = 'my-electron-app'  // key should vary and be in the format com.ethermail.app
// const account = 'user' // constant
// const password = 'secret-password'
// keytar.setPassword(service, account, password).then(() => {
//   keytar.getPassword(service, account).then((result) => {
//     console.log(result)
//   })
// })

// import * as keytar from "keytar";

import { store } from "./electron-store";
const keytar = require("keytar");
export class Keytar {
  static KEY_PREFIX = "com.myesterylabs/subnet-viewer";
  static REGISTERED_APP_NAME = "com.myesterylabs/subnet-viewer.app";
  static ACCOUNT_SERVICE = "com.myesterylabs/subnet-viewer.account";
  static constructKeyName(key: string) {
    return `${Keytar.KEY_PREFIX}.${key.toLowerCase().replace(/ /g, ".")}`;
  }
  
  static async saveAccount(url: string, password: string) {
    return await keytar.setPassword(Keytar.ACCOUNT_SERVICE, url, password);
  }
  
  static async getPassword(url: string) {
    return await keytar.getPassword(Keytar.ACCOUNT_SERVICE, url) as string;
  }
  
  static async getAllAccounts() {
    return store.get("accounts");
  }
}
export default Keytar;
