import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { chainList } from "src/config";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ChainList() {
  const [selected, setSelected] = useState(chainList[0]);
  console.log(chainList);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative">
            <div className="inline-flex divide-x divide-indigo-600 rounded-md shadow-sm">
              <div className="inline-flex divide-x divide-indigo-600 rounded-md shadow-sm">
                <Listbox.Button className="inline-flex items-center rounded border border-transparent bg-indigo-500 py-2 px-4 text-white shadow-sm">
                  <p className="text-sm font-medium">{selected.name}</p>
                </Listbox.Button>
              </div>
            </div>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute right-0 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {chainList.map((option) => (
                  <Listbox.Option
                    key={option.title}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-indigo-500" : "text-gray-900",
                        "cursor-default select-none p-4 text-sm"
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <p
                            className={
                              selected ? "font-semibold" : "font-normal"
                            }
                          >
                            {option.name}
                          </p>
                          {selected ? (
                            <span
                              className={
                                active ? "text-white" : "text-indigo-500"
                              }
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
