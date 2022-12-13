import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "@/components/layouts/nav";

import { WagmiConfig, createClient, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
// import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { TorusConnector, defaultChain, UpbondConnector } from "src/config";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  const { chains, provider, webSocketProvider } = configureChains([defaultChain], [publicProvider()]);

  const client = createClient({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({ chains }),
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
          chainId: 137,
        },
      }),
      new TorusConnector({
        chains,
        options: {
          buildEnv: "testing",
          enableLogging: true,
          buttonPosition: "bottom-left",
          showTorusButton: true,
        },
      }),
      new UpbondConnector({
        chains,
        options: {
          buildEnv: "new-dev-local",
          enableLogging: true,
          buttonPosition: "bottom-left",
          showTorusButton: true,
        },
      }),
      // new Web3AuthConnector({
      //   chains,
      //   options: {
      //     enableLogging: true,
      //     clientId:
      //       "BPIlEtkvvoWqtQoQu6nN-4PKpRZISyEna7In8-NZ28fYxsrzfE1qqqlagnV2TH7jSAMBM5j_zXGW-IuwwnuexoM", // Get your own client id from https://dashboard.web3auth.io
      //     network: "mainnet", // web3auth network, "mainnet", "cyan", or "aqua"
      //     chainId: "0x1", // chainId that you want to connect with
      //   },
      // }),
    ],
    provider,
    webSocketProvider,
  });
  return (
    <>
      <WagmiConfig client={client}>
        <Navbar />
        <Component {...pageProps} />
        <ToastContainer position="top-right" autoClose={6000} closeOnClick pauseOnHover />
      </WagmiConfig>
    </>
  );
}

export default MyApp;
