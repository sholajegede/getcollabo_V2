import React, { Fragment, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { FC } from "react";
import Slider from "rc-slider";
import { useRef } from "react";

export interface PriceRangeInputProps {
  onChange?: (data: any) => void;
  fieldClassName?: string;
}

const PriceRangeInput: FC<PriceRangeInputProps> = ({
  onChange,
  fieldClassName = "[ nc-hero-field-padding ]",
}) => {
  const [rangePrices, setRangePrices] = useState([5000, 500000]);;
  const rangeRef = useRef<HTMLInputElement>(null);

  
  useEffect(() => {
    const maxDefaultValue = document.getElementById("maxPrice");
    console.log(maxDefaultValue);

    const minDefaultValue = document.getElementById("minPrice");
    console.log(minDefaultValue);
  })


  


  return (
    <Popover className="flex relative flex-[1.5]">
      {({ open, close }) => (
        <>
          <div
            className={`flex-1 ${
              open ? "nc-hero-field-focused" : ""
            } flex flex-col sm:flex-row justify-between cursor-pointer`}
          >
            <Popover.Button
              className={`flex flex-1 text-left items-cente space-x-3 focus:outline-none ${fieldClassName} `}
              // PHẦN LOCATION-INPUT KHÔNG BẮT ĐƯỢC EVEN-CLICK KHI CLICK VÀO NÚT NÀY, NÊN CẦN CHẠY HACK NÀY
              onClick={() => {
                if (window.innerWidth >= 1024) {
                  document.querySelector("html")?.click();
                }
              }}
            >
              <div className="text-neutral-300 dark:text-neutral-400">
                <svg
                  className="nc-icon-field nc-icon-field-2"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="7.25"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  ></circle>
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M14.25 8.75H11.375C10.4775 8.75 9.75 9.47754 9.75 10.375V10.375C9.75 11.2725 10.4775 12 11.375 12H12.625C13.5225 12 14.25 12.7275 14.25 13.625V13.625C14.25 14.5225 13.5225 15.25 12.625 15.25H9.75"
                  ></path>
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 7.75V8.25"
                  ></path>
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 15.75V16.25"
                  ></path>
                </svg>
              </div>
              <div className="flex-grow">
                <span className="block xl:text-lg font-semibold truncate min-w-[170px]">
                  {`${rangePrices[0]} NGN ~ ${rangePrices[1]} NGN`}
                </span>
                <span className="block mt-1 text-sm font-light leading-none text-neutral-400 ">
                  Book Rate
                </span>
              </div>
            </Popover.Button>

          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-0 lg:right-0 z-30 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full -mt-14 sm:mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl border border-neutral-100 dark:border-neutral-800 md:!border-transparent">
              <div className="relative flex flex-col space-y-8">
                <div className="space-y-5">
                  <span className="font-medium">Price Range</span>
                  <Slider
                    range
                    className="text-red-400"
                    min={5000}
                    max={500000}
                    defaultValue={[rangePrices[0], rangePrices[1]]}
                    allowCross={false}
                    step={1000}
                    onChange={(_input: number | number[]) =>
                      setRangePrices(_input as number[])
                    }
                    ref={rangeRef}
                  />
                </div>

                <div className="flex justify-between space-x-5">
                  <div>
                    <label
                      htmlFor="minPrice"
                      className="block text-xs font-medium sm:text-sm text-neutral-700 dark:text-neutral-300"
                    >
                      Min price
                    </label>
                    <div className="relative mt-1 rounded-md">
                      <span className="absolute inset-y-0 flex items-center text-xs pointer-events-none right-4 text-neutral-500 sm:text-sm">
                        NGN
                      </span>
                      <input
                        type="text"
                        name="minPrice"
                        id="minPrice"
                        className="block pl-4 pr-10 text-xs bg-transparent rounded-full w-28 sm:w-32 sm:text-sm border-neutral-200 dark:border-neutral-700"
                        value={rangePrices[0]}
                        ref={rangeRef}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="maxPrice"
                      className="block text-xs font-medium sm:text-sm text-neutral-700 dark:text-neutral-300"
                    >
                      Max price
                    </label>
                    <div className="relative mt-1 rounded-md">
                      <span className="absolute inset-y-0 flex items-center text-xs pointer-events-none right-4 text-neutral-500 sm:text-sm">
                        NGN
                      </span>
                      <input
                        type="text"
                        name="maxPrice"
                        id="maxPrice"
                        className="block pl-4 pr-10 text-xs bg-transparent rounded-full w-28 sm:w-32 sm:text-sm border-neutral-200 dark:border-neutral-700"
                        value={rangePrices[1]}
                        ref={rangeRef}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default PriceRangeInput;
