export const listEIP = [
  {
    eipName: "Personal Message",
    eipCode: "EIP-191",
    eipFunc: "personal_sign",
    available: true,
  },
  {
    eipName: "Sign",
    eipCode: "EIP-712",
    eipFunc: "eth_sign",
    available: true,
  },
  {
    eipName: "Sign Typed Data",
    eipCode: "EIP-712",
    eipFunc: "signTypedData_v4",
    available: true,
  },
  {
    eipName: "Switch Network",
    eipCode: "EIP-3326",
    eipFunc: "wallet_switchEthereumChain",
    available: true,
  },
  {
    eipName: "Add Matic Network",
    eipCode: "EIP-3085",
    eipFunc: "wallet_addEthereumChain",
    available: false,
  },
  {
    eipName: "Send Transaction",
    eipCode: "EIP-155",
    eipFunc: "eth_sendTransaction",
    available: true,
  },
  {
    eipName: "Sign Transaction",
    eipCode: "EIP-695",
    eipFunc: "eth_signTransaction",
    available: false,
  },
  {
    eipName: "ETH Account",
    eipCode: "EIP-695",
    eipFunc: "eth_accounts",
    available: false,
  },
  {
    eipName: "Net Version",
    eipCode: "EIP-695",
    eipFunc: "net_version",
    available: false,
  },
  {
    eipName: "Chain Id",
    eipCode: "EIP-695",
    eipFunc: "eth_chainId",
    available: false,
  },
  {
    eipName: "Uninstall Filter",
    eipCode: "EIP-695",
    eipFunc: "eth_uninstallFilter",
    available: false,
  },
  {
    eipName: "Request Account",
    eipCode: "EIP-695",
    eipFunc: "eth_requestAccounts",
    available: false,
  },
  {
    eipName: "EC Recover",
    eipCode: "EIP-695",
    eipFunc: "eth_ecRecover",
    available: false,
  },
  {
    eipName: "Personal EC Recover",
    eipCode: "EIP-695",
    eipFunc: "personal_ecRecover",
    available: false,
  },
  {
    eipName: "Send Raw Transaction",
    eipCode: "EIP-695",
    eipFunc: "eth_sendRawTransaction",
    available: false,
  },
  {
    eipName: "Sign Typed Data V1",
    eipCode: "EIP-695",
    eipFunc: "eth_signTypedData_v1",
    available: false,
  },
  {
    eipName: "Sign Typed Data V2",
    eipCode: "EIP-695",
    eipFunc: "eth_signTypedData_v2",
    available: false,
  },
  {
    eipName: "Sign Typed Data V3",
    eipCode: "EIP-695",
    eipFunc: "eth_signTypedData_v3",
    available: false,
  },
  {
    eipName: "Sign Typed Data",
    eipCode: "EIP-695",
    eipFunc: "eth_signTypedData",
    available: false,
  },
  {
    eipName: "Watch Asset",
    eipCode: "EIP-695",
    eipFunc: "wallet_watchAsset",
    available: false,
  },
  {
    eipName: "Subscribe",
    eipCode: "EIP-695",
    eipFunc: "eth_subscribe",
    available: false,
  },
  {
    eipName: "Unsubscribe",
    eipCode: "EIP-695",
    eipFunc: "eth_unsubscribe",
    available: false,
  },
  {
    eipName: "New Filter",
    eipCode: "EIP-695",
    eipFunc: "eth_newFilter",
    available: false,
  },
  {
    eipName: "New Block Filter",
    eipCode: "EIP-695",
    eipFunc: "eth_newBlockFilter",
    available: false,
  },
  {
    eipName: "New Pending Transaction Filter",
    eipCode: "EIP-695",
    eipFunc: "eth_newPendingTransactionFilter",
    available: false,
  },
  {
    eipName: "Get Filter Changes",
    eipCode: "EIP-695",
    eipFunc: "eth_getFilterChanges",
    available: false,
  },
  {
    eipName: "Get Filter Logs",
    eipCode: "EIP-695",
    eipFunc: "eth_getFilterLogs",
    available: false,
  },
];
