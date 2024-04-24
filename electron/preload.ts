import type { Command, CommandResult, QueryResult } from "@/types/Command";
import { contextBridge, ipcRenderer } from "electron";

import type { Account } from "@/types/Account";
import { Queries } from "../src/types/Queries";
import { Topics } from "../src/types/Topic";

// import { electronAPI } from '@electron-toolkit/preload'
// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args;
    return ipcRenderer.on(channel, (event, ...args) =>
      listener(event, ...args)
    );
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args;
    return ipcRenderer.off(channel, ...omit);
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args;
    return ipcRenderer.send(channel, ...omit);
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args;
    return ipcRenderer.invoke(channel, ...omit);
  },

  // You can expose other APTs you need here.
  // ...
});

const api = {
  runCommand: (command: Command) => {
    if (command.async) {
      ipcRenderer.send(Topics.RUN_COMMAND, command);
      return null;
    }
    return ipcRenderer.invoke(Topics.RUN_COMMAND, command) as CommandResult;
  },
  listen: (event: string, channel: string, callback: Function) =>
    ipcRenderer.on(`${event}:${channel}`, (_event, value) => callback(value)),
  query: (query: Queries) =>
    ipcRenderer.invoke(Topics.QUERY, query) as CommandResult,
  // specific commands
  getWallets: () =>
    ipcRenderer.invoke(Topics.GET_WALLETS) as Promise<
      {
        address: string;
        balance: number;
      }[]
    >,
  getSubnets: () =>
    ipcRenderer.invoke(Topics.GET_SUBNETS) as Promise<string[]>,
  getDefaultWallet: () =>
    ipcRenderer.invoke(Topics.GET_DEFAULT_WALLET) as Promise<string>,
  login: (url: string, password: string) =>
    ipcRenderer.send(Topics.LOGIN, url, password),
};

export type APIType = typeof api;

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    // contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  // window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api;
}
