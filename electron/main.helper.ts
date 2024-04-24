// import { RENDERER_DIST, VITE_DEV_SERVER_URL } from "./main";

import { BrowserWindow, app } from "electron";

import path from "path";

let win: BrowserWindow | null;
require("dotenv").config()
// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │

// autoHideMenuBar: true,
// ...(process.platform === 'linux' ? { icon } : {}),
// webPreferences: {
//   preload: join(__dirname, '../preload/index.js'),
//   sandbox: false
// }
export function createWindow() {
  win = new BrowserWindow({
    fullscreen: true,
    minimizable: false,
    icon: path.join(process.env.VITE_PUBLIC as string, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }

  return win;
}

process.env.APP_ROOT = path.join(__dirname, "..");
// console.log("mongo", process.env);
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

// systemPreferences
// .promptTouchID("To get consent for a Security-Gated Thing")
// .then((success) => {
//   console.log("You have successfully authenticated with Touch ID!");
// })
// .catch((err) => {
//   console.log(err);
// });
