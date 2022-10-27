import { Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Connect from "@/components/button/connect";

export default function Navbar() {
  return (
    <>
      {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
      <Popover as="header" className="bg-white shadow-sm">
        {({ open }) => (
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
                <Connect />
              </div>
            </div>
          </>
        )}
      </Popover>
    </>
  );
}
