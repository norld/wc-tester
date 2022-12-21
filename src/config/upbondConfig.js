import { Connector, Chain } from "wagmi";
// import Upbond from "@upbond/upbond-embed";
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
    this.upbond = new Upbond({});
  }

  async connect() {
    try {
      console.log("Connecting...", this.upbond);
      await this.upbond.init({
        buildEnv: "v2_development",
        // isUsingDirect: false,
        skipDialog: false,
        dappRedirectUri: `${window.location.origin}`,
        network: {
          host: "https://polygon-testnet.public.blastapi.io",
          chainId: 80001,
          networkName: "Matic",
          blockExplorer: "",
          ticker: "MATIC",
          tickerName: "MATIC",
        },
        // selectedVerifier: 'upbond-wallet-tesnet-line',
        loginConfig: {
          jwt: {
            verifier: "upbond-google-dev-tesnet",
            typeOfLogin: "jwt",
            name: "google",
            description: "UPBOND GOOGLE",
            clientId: "hxFv4SaQVXv3tE_rhe5u9",
            jwtParameters: {
              domain: "https://lzg2dndj.auth.dev.upbond.io",
              client_id: "hxFv4SaQVXv3tE_rhe5u9",
              connection: "google",
            },
          },
          "upbond-wallet-tesnet-line": {
            name: "Upbond",
            description: "LINE with UPBOND Identity",
            typeOfLogin: "line",
            jwtParams: {
              domain: "https://lzg2dndj.auth.dev.upbond.io",
              connection: "line",
              client_id: "FoQ_Ri8rKSXkHf82GRzZK",
              clientId: "FoQ_Ri8rKSXkHf82GRzZK",
              scope: "openid email profile offline_access",
              // redirect_uri: "http://localhost:3000/auth",
            },
            jwtParameters: {
              domain: "https://lzg2dndj.auth.dev.upbond.io",
              connection: "line",
              client_id: "FoQ_Ri8rKSXkHf82GRzZK",
              clientId: "FoQ_Ri8rKSXkHf82GRzZK",
              scope: "openid email profile offline_access",
            },
            clientId: "BGbtA2oA0SYvm1fipIPaSgSTPfGJG8Q6Ep_XHuZY9qQVW5jUXTMd0l8xVtXPx91aCmFfuVqTZt9CK79BgHTNanU",
            logo: "https://app.upbond.io/assets/images/common/UPBOND%E3%83%AD%E3%82%B4new-01.svg",
            showOnModal: true,
            showOnDesktop: true,
            showOnMobile: true,
            mainOption: true,
            priority: 1,
            buttonBgColor: "#faf",
            buttonTextColor: "#FFF",
          },
        },
        // whiteLabel: {
        //   logo: "https://awsimages.detik.net.id/community/media/visual/2022/11/24/kucing-bernama-soleh-jadi-pegawai-ditjen-pajak-dok-twitter-ditjenpajakri_169.jpeg?w=700&q=90",
        //   name: "SAPI",
        //   modalLogo: "https://www.greeners.co/wp-content/uploads/2021/03/Kucing-Domestik-1.jpg",
        //   buttonLogo:
        //     "https://cdn0-production-images-kly.akamaized.net/5TERlfRWmX7-a0Wu8BrpIE52Vrk=/1200x1200/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4005698/original/052533500_1650872118-pexels-dids-1302290.jpg",
        //   modalColor: "#3F03FF",
        //   primaryColor: "#3F03FF",
        //   isActive: true,
        // },
      });
      console.log("@init", this.upbond);
      if (!this.upbond.isLoggedIn) await this.upbond.login();
      const provider = await this.upbond.provider;
      console.log("@login", provider);

      // if (provider.on) {
      //   provider.on("accountsChanged", this.onAccountsChanged);
      //   provider.on("chainChanged", this.onChainChanged);
      //   provider.on("connect", console.log("Connecting..."));
      //   // provider.on("disconnect", this.onDisconnect);
      // }

      console.log("@isAuthenticated");

      // Check if there is a user logged in
      const isAuthenticated = await this.isAuthorized();

      // Check if we have a chainId, in case of error just assign 0 for legacy
      let chainId = 1;
      try {
        chainId = await this.getChainId();
        // chainId = 1;
      } catch (e) {
        chainId = 1;
      }

      console.log("kemungkinan cuy", isAuthenticated);

      // if there is a user logged in, return the user
      if (isAuthenticated) {
        // const account = "0x597feEc90911564e2675D51EFC60aB956AC96c90";

        console.log("@Getting access");

        const signer = await this.getSigner();
        console.log("@signer", signer);
        const account = await signer.getAddress();
        console.log("@account", account);
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
    // return 1;
    console.log("sicing", this.upbond.ethereum);
    if (this.upbond) return this.upbond.ethereum.chainId || 80001;
    throw new Error("Chain ID is not defined");
  }
  async getProvider() {
    return this.upbond.provider;
  }

  async getSigner() {
    this.signer = new ethers.providers.Web3Provider(this.upbond.provider);
    console.log("signer", this.signer);
    return this.signer.getSigner();
  }

  async isAuthorized() {
    console.log("isAuthorized", this.upbond.isLoggedIn);
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
