import { listEIP } from "src/config/eipListConfig";
import {
  useSignMessage,
  useNetwork,
  useSwitchNetwork,
  useSignTypedData,
  usePrepareSendTransaction,
  useSendTransaction,
  chainId,
} from "wagmi";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

export default function EIPCard({}) {
  const { chain } = useNetwork();

  const [changeChainId, setChangeChainId] = useState(chain.id);

  const signMessage = useSignMessage({
    message: "Welcome to wallet connect tester 😎",
    onError(error) {
      if (error.reason) toast(<ErrorNotify err={error.reason} />);
      else toast(<ErrorNotify err={error.message} />);
    },
    onSuccess(data) {
      toast(<SuccessNotify data={data} />);
    },
  });

  const signType = useSignTypedData({
    domain: {
      name: "Ether Mail",
      version: "1",
      chainId: chain.id,
      verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
    },
    types: {
      Person: [
        { name: "name", type: "string" },
        { name: "wallet", type: "address" },
      ],
      Mail: [
        { name: "from", type: "Person" },
        { name: "to", type: "Person" },
        { name: "contents", type: "string" },
      ],
    },
    value: {
      from: {
        name: "Cow",
        wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
      },
      to: {
        name: "Bob",
        wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
      },
      contents: "Hello, Bob!",
    },
    onError(error) {
      toast(<ErrorNotify err={error.message} />);
    },
    onSuccess(data) {
      toast(<SuccessNotify data={data} />);
    },
  });

  const { config } = usePrepareSendTransaction({
    request: {
      to: "0x0A194EDb637c0C3007387a8Bf821C5C7C8274642",
      value: 0,
    },
  });

  const send = useSendTransaction({
    ...config,
    onError(error) {
      if (error.reason) toast(<ErrorNotify err={error.reason} />);
      else toast(<ErrorNotify err={error.message} />);
    },
    onSuccess(data) {
      toast(<SuccessNotify data={data} />);
    },
  });

  const network = useSwitchNetwork({
    chainId: changeChainId,
    throwForSwitchChainNotSupported: true,
    onError(error) {
      if (error.reason) toast(<ErrorNotify err={error.reason} />);
      else toast(<ErrorNotify err={error.message} />);
    },
    onSuccess(data) {
      toast(<SuccessNotify data={data} />);
    },
  });

  const handlerRequest = (func) => {
    switch (func) {
      case "personal_sign":
        return signMessage.signMessage();
      case "eth_sign":
        return signMessage.signMessage();
      case "signTypedData_v4":
        return signType.signTypedData();
      case "wallet_switchEthereumChain":
        return network.switchNetwork();
      case "wallet_addEthereumChain":
        return network.switchNetwork();
      case "eth_sendTransaction":
        return send.sendTransaction();
      case "eth_signTransaction":
        return "ba";
    }
  };

  useEffect(() => {
    chain.id && chain.id === 1 ? setChangeChainId(137) : setChangeChainId(1);
  }, [chain.id]);
  return (
    <div className="container mx-auto">
      <div className="bg-white shadow sm:rounded-lg mt-8">
        <div className="px-4 py-5 sm:p-6">
          <div className="text-lg font-medium leading-6 text-gray-900">
            List EIP
          </div>
          {listEIP.map((item, i) => {
            return (
              <EIPList
                key={i}
                eipName={item.eipName}
                eipCode={item.eipCode}
                eipHandler={item.eipFunc}
                available={item.available}
                handlerRequest={handlerRequest}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function EIPList({
  eipName,
  eipCode,
  eipHandler,
  handlerRequest,
  available,
}) {
  return (
    <div className="mt-5">
      <div className="rounded-md bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
        <div className="sr-only">Visa</div>
        <div className="sm:flex sm:items-start">
          <svg
            className="h-8 w-auto sm:h-6 sm:flex-shrink-0"
            viewBox="0 0 36 24"
            aria-hidden="true"
          >
            <rect width={36} height={24} fill="#224DBA" rx={4} />
            <path
              fill="#fff"
              d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
            />
          </svg>
          <div className="mt-3 sm:mt-0 sm:ml-4">
            <div className="text-sm font-medium text-gray-900">{eipName}</div>
            <div className="mt-1 text-sm text-gray-600 sm:flex sm:items-center">
              <div>{eipCode}</div>
              <span className="hidden sm:mx-2 sm:inline" aria-hidden="true">
                &middot;
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
          {available ? (
            <button
              type="button"
              onClick={() => {
                handlerRequest(eipHandler);
              }}
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Execute
            </button>
          ) : (
            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-3 py-2 text-sm font-medium leading-4 text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Not Available
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export const SuccessNotify = ({ data }) => {
  console.log(data);
  return <div className="font-bold underline">Request Approved!</div>;
};

export const ErrorNotify = ({ err }) => {
  return <div className="font-bold underline bg-danger">{err}</div>;
};
