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
    this.address = null;
  }

  async connect({ chainId }) {
    try {
      // const storage = localStorage.getItem("torus-app");
      // if (storage) {
      //   console.log("storage available", );
      //   return {
      //     account: storage.selectedAddress,
      //     chain: {
      //       id: storage.networkId,
      //       unsupported: true,
      //     },
      //     provider: this.torus.provider,
      //   };
      // }

      await this.torus.init({
        buildEnv: this.options.buildEnv,
        enableLogging: this.options.enableLogging,
        showTorusButton: this.options.showTorusButton,
        useLocalStorage: true,
      });
      await this.torus.login();
      const { typeOfLogin, verifierId } = await this.torus.getUserInfo();

      console.log(typeOfLogin, verifierId);
      this.address = await this.torus.getPublicAddress({
        verifier: typeOfLogin,
        verifierId,
      });
      console.log(this.address);
      console.log(this.torus, "this.torus");
      this.signer = new ethers.providers.Web3Provider(this.torus.provider);
      return {
        account: this.address.data,
        chain: {
          id: this.torus.ethereum.chainId,
          unsupported: true,
        },
        provider: this.torus.provider,
      };
    } catch (e) {
      console.log(e);
    }
  }

  async disconnect() {
    console.log("disconnect");
    await torus.cleanUp();
    await this.torus.logout();
  }

  async getAccount() {
    console.log("getAccount");
    return await this.address.data;
  }
  async getChainId() {
    console.log("getChainId");
    return this.torus.ethereum.chainId;
  }
  async getProvider() {
    console.log("getProvider", this.torus.provider);
    return this.torus.provider;
  }
  async getSigner() {
    return this.signer.getSigner();
  }
  async onAccountsChanged(accounts) {
    console.log("onAccountsChanged");
  }
  async onChainChanged(chainId) {
    console.log("onChainChanged");
    await this.torus.setProvider({
      host: "https://ethboston1.skalenodes.com:10062", // mandatory
      chainId: chainId, // optional
    });
    return this.torus.ethereum.chainId;
  }

  async onDisconnect() {
    return await this.torus.logout();
  }
}
