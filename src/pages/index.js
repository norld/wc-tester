import EIPCard from "@/components/card/list";
import { useAccount } from "wagmi";
export default function Index() {
  const { isConnected } = useAccount();
  if (isConnected) return <EIPCard />;
  else
    return (
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
    );
}
