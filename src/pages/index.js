import EIPList from "@/components/card/list";
import { listEIP } from "src/config/eipListConfig";
import { useAccount } from "wagmi";

export default function Index() {
  const { isConnected } = useAccount();
  return (
    <div className="container mx-auto">
      <div className="bg-white shadow sm:rounded-lg mt-8">
        {isConnected ? (
          <div className="px-4 py-5 sm:p-6">
            <div className="text-lg font-medium leading-6 text-gray-900">
              List EIP
            </div>
            {listEIP.map((item) => {
              return (
                <EIPList
                  key={item.id}
                  eipName={item.eipName}
                  eipCode={item.eipCode}
                  eipHandler={item.eipFunc}
                />
              );
            })}
          </div>
        ) : (
          <div className="bg-white">
            <div className="relative bg-white">
              <div aria-hidden="true" className="absolute" />

              <div className="mx-auto flex max-w-3xl flex-col items-center py-32 px-6 text-center sm:py-64 lg:px-0">
                <h1 className="text-4xl font-bold tracking-tight text-black lg:text-6xl">
                  Wallet Connect Tester
                </h1>
                <div className="mt-4 text-xl text-black">
                  Please connect wallet first to use overpower tester
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
