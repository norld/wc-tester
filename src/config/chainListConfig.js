export const defaultChain = {
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

export const chainList = [
  {
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
  },
  {
    id: 80001,
    name: "Polygon Testnet",
    network: "mumbai",
    nativeCurrency: {
      decimals: 18,
      name: "Matic",
      symbol: "MATIC",
    },
    rpcUrls: {
      default: "https://polygon-testnet.public.blastapi.io",
    },
    blockExplorers: {
      default: { name: "Polygonscan", url: "https://polygonscan.com" },
    },
    testnet: false,
  },
  {
    id: 1,
    name: "Ethereum",
    network: "mainnet",
    nativeCurrency: {
      decimals: 18,
      name: "Ethereum",
      symbol: "ETH",
    },
    rpcUrls: {
      default: "https://eth-mainnet.public.blastapi.io",
    },
    blockExplorers: {
      default: { name: "Etherscan", url: "https://etherscan.com" },
    },
    testnet: false,
  },
];
