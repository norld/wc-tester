import { Connector, Chain } from "wagmi";
import Upbond from "@upbond/upbond-embed";
import { ethers } from "ethers";

export class UpbondConnector extends Connector {
  id = "upbond";
  name = "Upbond";
  ready = true;

  constructor(config) {
    super(config);
    this.chains = config.chains;
    this.options = config.options;
    this.upbond = new Upbond({
      buttonPosition: config.options.buttonPosition, // default: bottom-left
    });
  }

  async connect() {
    try {
      await this.upbond.init({
        buildEnv: this.options.buildEnv,
        enableLogging: this.options.enableLogging,
        showTorusButton: this.options.showTorusButton,
        useLocalStorage: true,
      });
      await this.upbond.login();

      const provider = await this.upbond.provider;

      if (provider.on) {
        provider.on("accountsChanged", this.onAccountsChanged);
        provider.on("chainChanged", this.onChainChanged);
        provider.on("disconnect", this.onDisconnect);
      }

      // Check if there is a user logged in
      const isAuthenticated = await this.isAuthorized();

      // Check if we have a chainId, in case of error just assign 0 for legacy
      let chainId;
      try {
        chainId = await this.getChainId();
      } catch (e) {
        chainId = 0;
      }

      // if there is a user logged in, return the user
      if (isAuthenticated) {
        const signer = await this.getSigner();
        const account = await signer.getAddress();

        return {
          account,
          chain: {
            id: chainId,
            unsupported: false,
          },
          provider,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async disconnect() {
    try {
      if (this.upbond) {
        await this.upbond.logout();
        await this.upbond.cleanUp();
      }
    } catch (e) {
      console.log(e);
    }
  }

  switchNetwork() {
    console.log("sicing");
  }

  async getAccount() {
    return await this.signer.getAddress();
  }
  async getChainId() {
    console.log(this.chains);
    if (this.upbond) return this.upbond.ethereum.chainId;
    throw new Error("Chain ID is not defined");
  }

  async getProvider() {
    return this.upbond.provider;
  }

  async getSigner() {
    this.signer = new ethers.providers.Web3Provider(this.upbond.provider);
    return this.signer.getSigner();
  }

  async isAuthorized() {
    return this.upbond && this.upbond.isLoggedIn;
  }

  async onAccountsChanged(accounts) {
    console.log("onAccountsChanged", accounts);
  }

  async onChainChanged(chainId) {
    console.log("onChainChanged", chainId);
    // await this.upbond.setProvider({
    //   host: "https://ethboston1.skalenodes.com:10062", // mandatory
    //   chainId: chainId, // optional
    // });
    // return this.upbond.ethereum.chainId;
  }

  async onDisconnect() {
    return this.disconnect();
  }
}
