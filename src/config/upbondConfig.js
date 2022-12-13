import { Connector, Chain } from "wagmi";
// import Upbond from "@upbond/upbond-embed";
import Upbond from "../embed/upbondEmbed.esm";
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
      console.log("Connecting...", this.upbond);
      await this.upbond.init({
        buildEnv: this.options.buildEnv,
        enableLogging: this.options.enableLogging,
        showTorusButton: this.options.showTorusButton,
        useLocalStorage: true,
      });
      console.log("this.upbond", this.upbond);
      // await this.upbond.login();

      console.log("provider", this.upbond);
      const provider = await this.upbond.provider;
      if (provider.on) {
        // provider.on("accountsChanged", this.onAccountsChanged);
        provider.on("chainChanged", this.onChainChanged);
        // provider.on("connect", console.log("Connecting..."));
        // provider.on("disconnect", this.onDisconnect);
      }

      // Check if there is a user logged in
      const isAuthenticated = await this.isAuthorized();

      // Check if we have a chainId, in case of error just assign 0 for legacy
      let chainId = 1;
      try {
        chainId = await this.getChainId();
        chainId = 1;
      } catch (e) {
        chainId = 1;
      }

      console.log("kemungkinan cuy", isAuthenticated);

      // if there is a user logged in, return the user
      if (isAuthenticated) {
        const account = "0x597feEc90911564e2675D51EFC60aB956AC96c90";

        console.log("@Getting access");

        const signer = await this.getSigner();
        console.log("@signer", signer);
        // const account = await signer.getAddress();
        // console.log("@account", account);
        console.log("@provider", provider);
        console.log("@chainId", chainId);

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
      console.log("@disconnecting...");
      // if (this.upbond) {
      //   await this.upbond.logout();
      //   await this.upbond.cleanUp();
      // }
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
    return 1;
    console.log("sicing", this.upbond.ethereum);
    if (this.upbond) return this.upbond.provider.chainId;
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
    return disconnect();
  }
}
