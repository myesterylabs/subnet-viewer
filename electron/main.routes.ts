import { BrowserWindow, app, ipcMain, systemPreferences } from "electron";
import { electronApp, is, optimizer } from "@electron-toolkit/utils";

import { IPCRepo } from "./ipc-repo";
import Keytar from "./store/keytar";
// import { Queries } from "../src/types/Queries";
import { Topics } from "../src/types/Topic";
import { createWindow } from "./main.helper";
import { store } from "./store/electron-store";

require("dotenv").config();
let repo: IPCRepo;
let mainWindow: BrowserWindow;
app.whenReady().then(() => {
  app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  app.setAppUserModelId(Keytar.KEY_PREFIX);
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // check the auth status of store.auth if its set and less than now
  let auth = store.get("auth");
  if (auth.url) {
    if (auth.expiresAt < Date.now()) {
      store.delete("auth");
      // tell frontend to logout
      setTimeout(() => {
        mainWindow.webContents.send(`${Topics.LOGOUT}:${Topics.SUCCESS}`);
      }, 2000);
    } else {
      // load repo
      Keytar.getPassword(auth.url).then((password) => {
        repo = new IPCRepo(auth.url, password);
      });
    }
  } else {
    setTimeout(() => {
      mainWindow.webContents.send(`${Topics.LOGOUT}:${Topics.SUCCESS}`);
    }, 2000);
  }

  ipcMain.on(Topics.LOGIN, async (_event, url: string, password: string) => {
    let status = await IPCRepo.login(url, password);

    if (status) {
      // save to keytar
      await Keytar.saveAccount(url, password);
      store.set("accounts", [...store.get("accounts"), { url }]);
      // store login info
      store.set("auth", {
        url,
        // expires in 5 days
        expiresAt: Date.now() + 5 * 24 * 60 * 60 * 1000,
      });
      mainWindow.webContents.send(`${Topics.LOGIN}:${Topics.SUCCESS}`, { url });
    } else {
      mainWindow.webContents.send(`${Topics.LOGIN_FAILED}:TRUE`, { url });
    }
  });
  
  ipcMain.handle(Topics.GET_WALLETS, async (_event) => {
    let wallets = await repo.getWalletBalances();

    return wallets;
  });
  
  ipcMain.handle(Topics.GET_SUBNETS, async (_event) => {
    let subnets = await repo.listSubnets();
    return subnets;
  });

  ipcMain.handle(Topics.GET_DEFAULT_WALLET, async (_event) => {
    let result = await repo.getDefaultWallet();
    return result;
  });



  // const repo = new IPCRepo("http://34.133.97.146:8818", "098790879089789");

  //  repo.getWalletBalances().then((data) => { console.log(data)})
  // ipc-cli subnet create --parent /r314159 --min-validators 3 --min-validator-stake 10 --bottomup-check-period 30 --permission-mode collateral --supply-source-kind native
  // 0x5f5e7ef7805a2f14c48336d5dea96b88ede31455
  // repo
  //   .createSubnet({
  //     parent: "/r314159",
  //     minValidator: 4,
  //     minValidatorStake: 10,
  //     bottomUpCheckPeriod: 30,
  //     wallet: "0x5f5e7ef7805a2f14c48336d5dea96b88ede31455",
  //   })
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // })
  // repo.importWallet("0x405f50458008edd6e2eb2efc3bf34846db1d6689b89fe1a9f9ccfe7f6e301d8d")
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // console.log(app.getAppPath());
  // console.log(app.getPath("userData"));

  mainWindow = createWindow();
});