import React, { FC } from "react";
import { Helmet } from "react-helmet";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import NcImage from "shared/NcImage/NcImage";
import CardNFT from "components/CardNFT";
import Pagination from "shared/Pagination/Pagination";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonDropDownShare from "components/ButtonDropDownShare";
import TabFilters from "components/TabFilters"
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import useFetch from "hooks/useFetch";

export interface PageCollectionProps {
  className?: string;
  item?: string;
}

const PageCollection: FC<PageCollectionProps> = ({ className = "", item }) => {
  const { data, loading } = useFetch("/influencers?industry=");

  return (
    <div
      className={`nc-PageCollection  ${className}`}
      data-nc-id="PageCollection"
    >
      <Helmet>
        <title>Industry Section || GetCollabo</title>
      </Helmet>

      {/* HEADER */}
      <div className="w-full">
        <div className="relative w-full h-24 md:h-24 2xl:h-32">
        </div>
        <div className="container relative -mt-14 lg:-mt-20">
          <div className=" bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-8 rounded-3xl md:rounded-[40px] shadow-xl flex flex-col md:flex-row lg:items-center">
            <div className="flex flex-col sm:flex-row md:block sm:items-start sm:justify-between">
              <div className="w-40 sm:w-48 md:w-56 xl:w-60">
                <NcImage
                  src=""
                  containerClassName="aspect-w-1 aspect-h-1 rounded-3xl overflow-hidden"
                />
              </div>
              <div className="flex items-center mt-4 space-x-3 sm:justify-center">
                <div className="flex space-x-1.5">
                  <ButtonDropDownShare
                    className="flex items-center justify-center w-8 h-8 rounded-full cursor-pointer md:w-10 md:h-10 bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:bg-neutral-800 "
                    panelMenusClass="origin-top-right !-right-5 !w-40 sm:!w-52"
                  />
                </div>
              </div>
            </div>
            <div className="flex-grow mt-5 md:mt-0 md:ml-8 xl:ml-14">
              <div className="max-w-screen-sm ">
                <h2 className="inline-block text-2xl font-semibold sm:text-3xl lg:text-4xl">
                  {"Comedy/Skits Category"}
                </h2>
                <span className="block mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                  This category is for influencers in the comedy/skit making industry.
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-6 xl:mt-8 lg:grid-cols-4 sm:gap-4 xl:gap-6">
                {/* ----- 1 ----- */}
                <div className="flex flex-col items-center justify-center p-5 border shadow-md rounded-2xl border-neutral-50 dark:border-neutral-800 lg:p-6">
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    Influencers
                  </span>
                  <span className="mt-4 text-base font-medium sm:text-xl sm:mt-6">
                    25
                  </span>
                  <span className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    total
                  </span>
                </div>

                {/* ----- Volume ----- */}
                <div className="flex flex-col items-center justify-center p-5 border shadow-md rounded-2xl border-neutral-50 dark:border-neutral-800 lg:p-6">
                  <span className="text-sm text-green-500 dark:text-green-500">
                    Online
                  </span>
                  <span className="mt-4 text-base font-medium sm:text-xl sm:mt-6">
                    12
                  </span>
                  <span className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    total
                  </span>
                </div>

                {/* ----- Latest Price ----- */}
                <div className="flex flex-col items-center justify-center p-5 border shadow-md rounded-2xl border-neutral-50 dark:border-neutral-800 lg:p-6">
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    Offline
                  </span>
                  <span className="mt-4 text-base font-medium sm:text-xl sm:mt-6">
                    13
                  </span>
                  <span className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    total
                  </span>
                </div>

                {/* -----Items ----- */}
                <div className="flex flex-col items-center justify-center p-5 border shadow-md rounded-2xl border-neutral-50 dark:border-neutral-800 lg:p-6">
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    Booking price
                  </span>
                  <span className="mt-4 text-base font-medium sm:text-xl sm:mt-6">
                    N 13,500
                  </span>
                  <span className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    (Avg)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}

      <div className="container py-16 space-y-20 lg:pb-28 lg:pt-20 lg:space-y-28">
        <main>
          {/* TABS FILTER */}
          <TabFilters />

          {/* LOOP ITEMS */}
          {/**
                 * <div className="grid mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 lg:mt-10">
                  {loading ? (
                    "loading"
                  ) : (
                    <>
                      {data.map((item) => (
                        <CardNFT />
                      ))}
                    </>
                  )}
                </div>
                 * 
                 */}

          {/* PAGINATION */}
          <div className="flex flex-col mt-12 space-y-5 lg:mt-16 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            {/**
            <Pagination />
            */}
            <ButtonPrimary loading>Show me more</ButtonPrimary>
          </div>
        </main>


        {/* SUBCRIBES */}
        <SectionBecomeAnAuthor />
      </div>
    </div>
  );
};

export default PageCollection;
