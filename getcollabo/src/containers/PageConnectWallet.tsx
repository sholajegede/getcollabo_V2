// @ts-nocheck
import React, { FC, useState, useEffect, useContext } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { Helmet } from "react-helmet";
import { InfluencerData } from "routers/types";
import { useParams, Link } from "react-router-dom";
import newRequest from "utils/newRequest";
import { AuthContext } from "context/AuthContext";
import { BrandProfileData } from "routers/types";
import { AiOutlineFieldTime } from "react-icons/ai";

interface ErrorType {
  message: string;
}
export interface PageConnectWalletProps {
  className?: string;
}

const PageConnectWallet: FC<PageConnectWalletProps> = ({ className = "" }) => {
  const { username } = useParams();
  const { brand } = useContext(AuthContext);
  const [brandProfile, setBrandProfile] = useState<BrandProfileData | {}>({});
  const [influencer, setInfluencer] = useState<InfluencerData | {}>({});
  const [error, setError] = useState<ErrorType | null>(null);

  //
  useEffect(() => {
    newRequest
      .get(`/influencer/get/${username}`)
      .then((response) => setInfluencer(response.data))
      .catch((err) => setError(err));
  }, [username]);
  //

  //
  useEffect(() => {
    const fetchBrandProfile = async () => {
      const response = await newRequest.get(`/brand/${brand._id}`);
      setBrandProfile(response.data);
    };
    fetchBrandProfile();
  }, [brand]);
  //

  return (
    <>
      <div
        className={`nc-PageConnectWallet ${className}`}
        data-nc-id="PageConnectWallet"
      >
        <Helmet>
          <title>Choose Deliverable | GetCollabo</title>
        </Helmet>
        <div className="container">
          <div className="max-w-3xl mx-auto my-12 space-y-8 sm:lg:my-16 lg:my-24 sm:space-y-10">
            {/* HEADING */}
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold sm:text-4xl">
                Choose a deliverable
              </h2>
              <span className="block mt-3 text-sm text-neutral-500 lg:text-base md:text-base dark:text-neutral-400">
                These are the available deliverable options offered by{" "}
                <span className="font-semibold capitalize">
                  {influencer.username}.
                </span>{" "}
                Click on any to book.
              </span>
            </div>
            <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

            <div className="mt-10 space-y-5 md:mt-0 sm:space-y-6 md:sm:space-y-8">
              <div className="space-y-3">
                {!Array.isArray(influencer.deliverable)
                  ? `No available deliverables offered by ${influencer.username}.`
                  : influencer.deliverable && influencer.deliverable.length > 0
                  ? influencer.deliverable.map(
                      (item) =>
                        item._id &&
                        item.description &&
                        item.rate &&
                        item.deliveryTime &&
                        (brandProfile.industry &&
                        brandProfile.businessName &&
                        brandProfile.logo &&
                        brandProfile.desc ? (
                          <Link
                            key={item._id}
                            typeof="button"
                            to={`/order/${influencer.username}/${item._id}`}
                            tabIndex={0}
                            className="relative flex px-3 py-4 border cursor-pointer rounded-xl hover:shadow-lg hover:bg-neutral-50 border-neutral-200 dark:border-neutral-700 sm:px-5 focus:outline-none focus:shadow-outline-blue focus:border-blue-500 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-900 dark:hover:text-neutral-200"
                          >
                            <div className="flex items-center w-full">
                              <div className="inline-grid ml-4 text-xs font-normal sm:ml-8 sm:text-base">
                                <div>{item.description}</div>
                                <div className="inline mt-2">
                                  <span className="mt-2 text-green-500">
                                    NGN
                                  </span>{" "}
                                  <span className="">
                                    {item.rate.toLocaleString()}
                                  </span>
                                  {" - "}
                                  <span className="inline-flex">{item.deliveryTime} delivery <AiOutlineFieldTime className="w-4 h-4 ml-1"/></span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ) : (
                          <Link
                            key={item._id}
                            to={`/complete-registration/${brand._id}`}
                            className="relative flex px-3 py-4 border cursor-pointer rounded-xl hover:shadow-lg hover:bg-neutral-50 border-neutral-200 dark:border-neutral-700 sm:px-5 focus:outline-none focus:shadow-outline-blue focus:border-blue-500 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-900 dark:hover:text-neutral-200"
                          >
                            <div className="flex items-center w-full">
                              <div className="inline-grid ml-4 text-xs font-normal sm:ml-8 sm:text-base">
                                <div>{item.description}</div>
                                <div className="inline mt-2">
                                  <span className="mt-2 text-green-500">
                                    NGN
                                  </span>{" "}
                                  <span className="">
                                    {item.rate.toLocaleString()}
                                  </span>
                                  {" - "}
                                  <span className="inline-flex">{item.deliveryTime} delivery <AiOutlineFieldTime className="w-4 h-4 ml-1"/></span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))
                    )
                  : null}
              </div>

              {/* ---- */}
              <div className="pt-2 ">
                  <div className="flex flex-col pt-2 mt-4 space-x-0 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                    <Link to={`/book/${username}`}>
                      <ButtonSecondary type="button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M9.57 5.92993L3.5 11.9999L9.57 18.0699"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M20.5 12H3.67004"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="ml-2">Back</span>
                      </ButtonSecondary>
                    </Link>
                    <Link to={`/custom-booking/${influencer.username}`} className="relative inline-flex items-center justify-center h-auto px-4 py-3 text-sm font-medium transition-colors rounded-full disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 dark:text-neutral-200 sm:px-6 sm:text-base">
                      <span>Place Custom Booking</span>
                    </Link>
                  </div>
                  <p className="mt-4 text-xs text-center xl:text-start md:text-start sm:text-start lg:text-start">Custom booking allows you to input a deliverable, delivery timeframe and amount already agreed upon between you and the creator.</p>
                {error && (
                  <span className="justify-center text-sm text-center">
                    {error.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageConnectWallet;
