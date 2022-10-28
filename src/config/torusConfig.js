import { Connector, Chain } from "wagmi";
// import { CoolWalletOptions, CoolWalletProvider } from 'cool-wallet-sdk'
import Torus from "@toruslabs/torus-embed";
import { ethers } from "ethers";

export class TorusConnector extends Connector {
  id = "torus";
  name = "Torus Wallet";
  ready = true;

  constructor(config) {
    super(config);
    this.options = config.options;
    this.torus = new Torus({
      buttonPosition: config.options.buttonPosition, // default: bottom-left
    });
  }

  async connect() {
    try {
      await this.torus.init({
        buildEnv: this.options.buildEnv,
        enableLogging: this.options.enableLogging,
        showTorusButton: this.options.showTorusButton,
        useLocalStorage: true,
      });
      await this.torus.login();

      const provider = await this.torus.provider;

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
    await this.torus.logout();
    await this.torus.cleanUp();
  }

  async switchNetwork() {
    console.log("sicing");
  }

  async getAccount() {
    return await this.signer.getAddress();
  }
  async getChainId() {
    if (this.torus) return this.torus.ethereum.chainId;
    throw new Error("Chain ID is not defined");
  }

  async getProvider() {
    return this.torus.provider;
  }

  async getSigner() {
    this.signer = new ethers.providers.Web3Provider(this.torus.provider);
    return this.signer.getSigner();
  }

  async onAccountsChanged(accounts) {
    console.log("onAccountsChanged", accounts);
  }

  async onChainChanged(chainId) {
    console.log("onChainChanged", chainId);
    // await this.torus.setProvider({
    //   host: "https://ethboston1.skalenodes.com:10062", // mandatory
    //   chainId: chainId, // optional
    // });
    // return this.torus.ethereum.chainId;
  }

  async isAuthorized() {
    return this.torus.isLoggedIn;
  }

  async onDisconnect() {
    return this.disconnect();
  }
}
