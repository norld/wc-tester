import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import Navbar from "@/components/layouts/nav";

import { WagmiConfig, createClient, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

function MyApp({ Component, pageProps }) {
  const polygonChain = {
    id: 137,
    name: "Polygon",
    network: "polygon",
    nativeCurrency: {
      decimals: 18,
      name: "Matic",
      symbol: "MATIC",
    },
    rpcUrls: {
      default: "https://polygon-rpc.com",
    },
    blockExplorers: {
      default: { name: "Polygonscan", url: "https://polygonscan.com" },
    },
    testnet: false,
  };

  const { chains, provider, webSocketProvider } = configureChains(
    [polygonChain],
    [publicProvider()]
  );

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
    ],
    provider,
    webSocketProvider,
  });
  return (
    <>
      <WagmiConfig client={client}>
        <Navbar />
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={6000}
          closeOnClick
          pauseOnHover
        />
      </WagmiConfig>
    </>
  );
}

export default MyApp;
