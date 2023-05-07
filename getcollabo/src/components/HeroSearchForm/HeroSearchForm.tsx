import React, { FC, useEffect, useState } from "react";
import LocationInput from "./LocationInput";
import PriceRangeInput from "./PriceRangeInput";
import ItemTypeSelect from "./ItemTypeSelect";

export interface HeroSearchFormProps {
  className?: string;
  haveDefaultValue?: boolean;
}

// DEFAULT DATA FOR ARCHIVE PAGE
const defaultLocationValue = "";

const HeroSearchForm: FC<HeroSearchFormProps> = ({ className = "", haveDefaultValue = false, }) => {
  const [locationInputValue, setLocationInputValue] = useState('');
  

  //
  useEffect(() => {
    if (haveDefaultValue) {
      setLocationInputValue(defaultLocationValue);
    }
  }, []);
  //

  return (
    <div
      className={`nc-HeroSearchForm w-full max-w-6xl py-5 lg:py-0 ${className}`}
      data-nc-id="HeroSearchForm"
    >
      <form className="w-full relative xl:mt-8 flex flex-col lg:flex-row rounded-[30px] md:rounded-[36px] lg:rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700 lg:divide-y-0">
        <LocationInput
          defaultValue={locationInputValue}
          onChange={(e) => setLocationInputValue(e)}
          className="flex-1 lg:flex-[1.5]"
        />
        
        <ItemTypeSelect />
        {/**
         * <PriceRangeInput />
         */}
        
        
        {/* BUTTON SUBMIT OF FORM */}
        <div className="flex items-center sm:pr-1 md:pr-2 xl:pr-4">
          <button
            type="button"
            className="flex items-center justify-center w-full px-4 rounded-full h-14 md:h-16 md:w-16 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none"
          >
            <span className="mr-3 md:hidden">Search</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 22L20 20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeroSearchForm;
