import EIPCard from "@/components/card/list";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import { UpbondConnector } from "src/config";
import Connect from "@/components/button/connect";
import { useConnect } from "wagmi";
import { useEffect, useState } from "react";
export default function Index() {
  const router = useRouter();
  const { connect, chains } = useConnect();
  const { selectedAddress } = router.query;
  const { isConnected } = useAccount();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (selectedAddress) {
      const upbondLogin = new UpbondConnector({
        chains,
        options: {
          buildEnv: "v2_development",
          enableLogging: true,
          buttonPosition: "bottom-left",
          showTorusButton: true,
        },
      });
      connect({ connector: upbondLogin });
    }
  }, [selectedAddress]);

  useEffect(() => {
    isConnected && setConnected(true);
  }, [isConnected]);
  return connected ? (
    <EIPCard />
  ) : (
    <div className="bg-white">
      <div className="relative bg-white">
        <div aria-hidden="true" className="absolute" />

        <div className="mx-auto flex max-w-3xl flex-col items-center py-32 px-6 text-center sm:py-64 lg:px-0">
          <h1 className="text-4xl font-bold tracking-tight text-black lg:text-6xl">Wallet Connect Tester</h1>
          <div className="mt-4 text-xl text-black">Please connect wallet first to use overpower tester</div>
        </div>
      </div>
    </div>
  );
}
