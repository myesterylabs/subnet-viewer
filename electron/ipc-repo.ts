// const fetch = require("node-fetch");
import fetch from "node-fetch";
export class IPCRepo {
  static async login(url: string, password: string) {
    // use axios to send a post request to / with {args: "--version"} and wait for a 200 response
    let response;

    //   use node-fetch
    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` ${password}`,
        },
        body: JSON.stringify({ args: ["--version"] }),
      });
      let data = await response.json();
      console.log(data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  private url: string;
  private password: string;

  constructor(url: string, password: string) {
    this.url = url;
    this.password = password;
  }

  async query(args: string[]) {
    let response;
    try {
      response = await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` ${this.password}`,
        },
        body: JSON.stringify({ args }),
      });
      let data = (await response.json()) as { output: string };
      return transformToObject(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async listSubnets() {
    let data: string[];
    try {
      data = await this.query(["subnet", "list", "--parent=/r314159"]);
      const parsedObjects = data.map((item) => {
        const parts = item.split(" - ");
        const address = parts[0];
        const attributes = parts[1].split(", ");

        // Extracting values from attributes
        const collateral = parseFloat(attributes[0].split(": ")[1]);
        const circSupply = parseFloat(attributes[1].split(": ")[1]);
        const genesis = parseInt(attributes[2].split(": ")[1]);

        return {
          address,
          collateral,
          circSupply,
          genesis,
        };
      });

      return parsedObjects;
    } catch {
      return [];
    }
  }

  async createSubnet({
    parent,
    minValidator,
    minValidatorStake,
    bottomUpCheckPeriod,
    wallet,
  }: {
    parent: string;
    minValidator: number;
    minValidatorStake: number;
    bottomUpCheckPeriod: number;
    wallet: string;
  }) {
    let data: string[];
    try {
      data = await this.query([
        "subnet",
        "create",
        "--parent",
        parent,
        "--min-validators",
        minValidator.toString(),
        "--min-validator-stake",
        minValidatorStake.toString(),
        "--bottomup-check-period",
        bottomUpCheckPeriod.toString(),
        "--permission-mode",
        "collateral",
        "--from",
        wallet,
        "--supply-source-kind",
        "native",
      ]);
      let id = data.map((x) => extractSubnetId(x)).filter((x) => !!x)[0];
      return id;
    } catch {
      // return false;
      return null;
    }
  }
  
  // ipc-cli wallet get-default --wallet-type evm
  async getDefaultWallet() {
    let data: string[];
    try {
      data = await this.query(["wallet", "get-default", "--wallet-type", "evm"]);
      return data[0];
    } catch {
      return null;
    }
  }

  // ipc-cli wallet set-default --wallet-type <wallet-type> --address <EVM-ADDRESS>
  async setDefaultWallet(address: string) {
    try {
      await this.query([
        "wallet",
        "set-default",
        "--wallet-type",
        "evm",
        "--address",
        address,
      ]);
      return true;
    } catch {
      return false;
    }
  }

  // wallet balances --wallet-type evm --subnet /r314159
  async getWalletBalances() {
    let data: string[];
    try {
      data = await this.query([
        "wallet",
        "balances",
        "--wallet-type",
        "evm",
        "--subnet",
        "/r314159",
      ]);

      const parsedObjects = data.map((item) => {
        const parts = item.split(" - ");
        const address = parts[0];
        const balance = parseFloat(parts[1].split(": ")[1]);

        return {
          address,
          balance,
        };
      });

      return parsedObjects;
    } catch {
      return [];
    }
  }
  
  async importWallet(privateKey: string) {
    try {
      let data = await this.query([
        "wallet",
        "import",
        "--wallet-type",
        "evm",
        `--private-key=${privateKey}`,
      ]);
      return data[0] as string
    } catch {
      return null;
    }
  }
  
  // ipc-cli wallet new --wallet-type evm
  async createWallet() {
    try {
      let data = await this.query([
        "wallet",
        "new",
        "--wallet-type",
        "evm",
      ]);
      return data[0] as string
    } catch {
      return null;
    }
  }
  
}

function transformToObject(inputObj: { output: string }) {
  // Extract the value of the 'output' key from the input object
  const outputString = inputObj.output;

  // Split the output string by newlines to create an array
  const outputArray = outputString.split("\n");

  // Remove empty strings from the array
  const filteredArray = outputArray.filter((line) => line.trim() !== "");

  return filteredArray;
}
function extractSubnetId(logLine: string) {
  const subnetIdMatch = logLine.match(/\/r.+/);
  return subnetIdMatch ? subnetIdMatch[0] : null;
}
