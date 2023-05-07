// @ts-nocheck
import React, { FC, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { InfluencerType } from "../routers/types";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import CardNFT from "components/CardNFT";
import ButtonCircle from "shared/Button/ButtonCircle";
import Input from "shared/Input/Input";
import Pagination from "components/Pagination";
import LocationInput from "components/HeroSearchForm/LocationInput";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import { useLocation } from "react-router-dom";
import { LocationState } from "routers/types";
import newRequest from "utils/newRequest";

export interface PageSearchProps {
  className?: string;
}

const PageSearch: FC<PageSearchProps> = ({ className = "" }) => {
  const location = useLocation<LocationState>();
  const [industryInputValue, setIndustryInputValue] = useState(
    location.state?.industryInputValue
  );
  const [influencers, setInfluencers] = useState([]);
  const [error, setError] = useState({});
  const [min, setMin] = useState<any | null>(undefined);
  const [max, setMax] = useState<any | null>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPerPage] = useState(8);

  // Search State
  const [search, setSearch] = useState("");

  //
  useEffect(() => {
    newRequest
      .get("/influencer/all")
      .then((response) => setInfluencers(response.data))
      .catch((err) => setError(err));
  }, []);
  //

  // Get current influencers
  const indexOfLastInfluencer = currentPage * numPerPage;
  const indexOfFirstInfluencer = indexOfLastInfluencer - numPerPage;
  const currentInfluencers = influencers.slice(
    indexOfFirstInfluencer,
    indexOfLastInfluencer
  );

  const filteredInfluencers = Array.from(currentInfluencers).filter((item) => {
    const influencer = item as InfluencerType;
    const username = influencer.username?.toLowerCase() || '';
    const industry = influencer.industry || '';
    const deliverable = influencer.deliverable || [];
    const img = influencer.img || '';

    // Filter out influencers without required properties
    if (!username || !industry || !img || deliverable.length === null) {
      return false;
    }

    const searchLowerCase = search.toLowerCase();
    if (searchLowerCase !== "" && !username.includes(searchLowerCase)) {
      return false;
    }

    return true;
  });

  const handleClick = () => {
    if (
      industryInputValue === "industry" &&
      (min === undefined || max === undefined)
    ) {
      if (min === undefined && max === undefined) {
        setError({ message: "Please select a min and max booking rate" });
      } else if (min === undefined) {
        setError({ message: "Please select a min booking rate" });
      } else {
        setError({ message: "Please select a max booking rate" });
      }
      return;
    }

    if (min === undefined && max === undefined) {
      setError({ message: "Please select a min and max booking rate" });
      return;
    }

    if (min === undefined && max !== undefined) {
      setError({ message: "Please select a min booking rate" });
      return;
    }

    if (max === undefined && min !== undefined) {
      setError({ message: "Please select a max booking rate" });
      return;
    }

    newRequest
      .get(`/influencer?industry=${industryInputValue}&min=${min}&max=${max}`)
      .then((response) => setInfluencers(response.data))
      .catch(() =>
        setError({ message: "You need to choose a min and max rate" })
      );
  };

  return (
    <div className={`nc-PageSearch  ${className}`} data-nc-id="PageSearch">
      <Helmet>
        <title>Start Search | GetCollabo</title>
      </Helmet>

      <div
        className={`nc-HeadBackgroundCommon h-20 2xl:h-16 top-0 left-0 right-0 w-full bg-primary-50 dark:bg-neutral-800/20 `}
        data-nc-id="HeadBackgroundCommon"
      />

      <div className="container">
        <header className="flex flex-col max-w-2xl mx-auto -mt-10 lg:-mt-7">
          <form className="relative w-full " method="post">
            <label
              htmlFor="search-input"
              className="text-neutral-500 dark:text-neutral-300"
            >
              <span className="sr-only">Search all icons</span>
              <Input
                className="border-0 shadow-lg dark:border"
                id="search-input"
                type="search"
                placeholder="Search by username"
                sizeClass="pl-14 py-5 pr-5 md:pl-16"
                rounded="rounded-full"
                onChange={(e) => setSearch(e.target.value)}
              />
              <ButtonCircle
                className="absolute right-2.5 top-1/2 transform -translate-y-1/2"
                size=" w-11 h-11"
                type="button"
                onClick={() => setSearch(document.getElementById('search-input').value)}
              >
                <i className="text-xl las la-arrow-right"></i>
              </ButtonCircle>
              <span className="absolute text-2xl transform -translate-y-1/2 left-5 top-1/2 md:left-6">
                <svg
                  className="w-5 h-5"
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
              </span>
            </label>
          </form>
        </header>
      </div>

      <div className="container">
        <div
          className={`nc-HeroSearchForm w-full max-w-6xl py-5 lg:py-0 ${className}`}
          data-nc-id="HeroSearchForm"
        >
          <form className="w-full relative xl:mt-8 flex flex-col lg:flex-row rounded-[30px] md:rounded-[36px] lg:rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700 lg:divide-y-0">
            <LocationInput
              defaultValue={industryInputValue}
              onChange={(e) => setIndustryInputValue(e)}
              className="flex-1 lg:flex-[1.5]"
            />

            {/* MIN PRICE: 5000 */}
            <div className="relative flex nc-flex-1.5">
              <div className="flex flex-1 relative [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left">
                <div className="text-neutral-300 dark:text-neutral-400">
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
                </div>
                <div className="flex-grow">
                  <input
                    className={`block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate`}
                    placeholder="Min Book Rate"
                    value={min}
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                  />
                  <span className="block mt-0.5 text-sm text-neutral-400 font-light ">
                    <span className="line-clamp-1">
                      {!!min ? "Min Book Rate" : "NGN"}
                    </span>
                  </span>
                  {error &&
                    error.message &&
                    min === undefined &&
                    max !== undefined && (
                      <span className="block mt-1 text-sm font-medium text-red-500">
                        {error.message}
                      </span>
                    )}
                  {error &&
                    error.message &&
                    min === undefined &&
                    max === undefined && (
                      <span className="block mt-1 text-sm font-medium text-red-500">
                        {error.message}
                      </span>
                    )}
                </div>
              </div>
            </div>

            {/* MAX PRICE: 5000 */}
            <div className="relative flex nc-flex-1.5">
              <div className="flex flex-1 relative [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left">
                <div className="text-neutral-300 dark:text-neutral-400">
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
                </div>
                <div className="flex-grow">
                  <input
                    className={`block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate`}
                    placeholder="Max Book Rate"
                    value={max}
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                  />
                  <span className="block mt-0.5 text-sm text-neutral-400 font-light ">
                    <span className="line-clamp-1">
                      {!!max ? "Max Book Rate" : "NGN"}
                    </span>
                  </span>
                  {error &&
                    error.message &&
                    max === undefined &&
                    min !== undefined && (
                      <span className="block mt-1 text-sm font-medium text-red-500">
                        {error.message}
                      </span>
                    )}
                  {error &&
                    error.message &&
                    min === undefined &&
                    max === undefined && (
                      <span className="block mt-1 text-sm font-medium text-red-500">
                        {error.message}
                      </span>
                    )}
                </div>
              </div>
            </div>

            {/* BUTTON SUBMIT OF FORM */}
            <div className="flex items-center sm:pr-1 md:pr-2 xl:pr-4">
              <button
                type="button"
                className="flex items-center justify-center w-full px-4 rounded-full h-14 md:h-16 md:w-16 bg-primary-6000 hover:bg-primary-700 text-neutral-50 focus:outline-none"
                onClick={handleClick}
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
      </div>

      <div className="container py-16 space-y-16 lg:pb-28 lg:pt-4 lg:space-y-28">
        <main>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 lg:mt-10">
            {filteredInfluencers.length === 0 ? (
              <p className="justify-center col-span-2 text-sm text-center">
                No creators available for the industry, rate or username selected
              </p>
            ) : (
              filteredInfluencers.map((item: InfluencerType, index) => (
                <CardNFT influencerProp={item} index={index} key={index} />
              ))
            )}
          </div>

          <Pagination
            totalInfluencers={influencers.length}
            numPerPage={numPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </main>

        <div className="relative py-20 lg:py-24">
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div>
      </div>
    </div>
  );
};

export default PageSearch;
