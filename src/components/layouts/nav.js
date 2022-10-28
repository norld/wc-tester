import Connect from "@/components/button/connect";
import ChainList from "@/components/button/chain";

export default function Navbar() {
  return (
    <>
      <div className="mx-auto px-4 py-3 sm:px-6">
        <div className="relative flex justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <a href="#">
                <img
                  className="block h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
                />
              </a>
            </div>
          </div>
          <div className="flex flex-wrap">
            <ChainList />
            <div className="px-1"></div>
            <Connect />
          </div>
        </div>
      </div>
    </>
  );
}
