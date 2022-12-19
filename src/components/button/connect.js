import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useAccount, useConnect } from "wagmi";
import { useBalance } from "wagmi";
import { useState, useEffect } from "react";
import { useDisconnect } from "wagmi";

export default function Connect() {
  const [balance, setBalance] = useState({
    decimals: 18,
    formatted: 0,
    symbol: "MATIC",
    value: {},
  });
  const { connector: activeConnector, isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();

  const balanceState = useBalance({
    addressOrName: address,
  });
  useEffect(() => {
    if (!balanceState.isLoading && balanceState.data !== undefined) setBalance(balanceState.data);
  }, [balanceState.isLoading]);
  return (
    <>
      {isConnected && !balanceState.isLoading ? (
        <div className="flex items-center justify-end">
          <a
            onClick={() => {
              disconnect();
            }}
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {new Intl.NumberFormat().format(balance.formatted)} {balance.symbol}
          </a>
        </div>
      ) : (
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
              Connect Wallet
              <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {connectors.map((connector) => (
                  <Menu.Item key={connector.id}>
                    <button disabled={!connector.ready} className="block px-4 py-2 text-sm" onClick={() => connect({ connector })}>
                      {connector.name}
                      {isLoading && pendingConnector?.id === connector.id && " (connecting)"}
                    </button>
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </>
  );
}
