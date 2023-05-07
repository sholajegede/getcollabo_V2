// @ts-nocheck
import React, { FC, Fragment, useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import NcImage from "shared/NcImage/NcImage";
import NftMoreDropdown from "components/NftMoreDropdown";
import SocialsList from "shared/SocialsList/SocialsList";
import { Tab } from "@headlessui/react";
import EditBrandButton from "./EditBrandButton";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { AuthContext } from "context/AuthContext";
import BrandLogin from "containers/PageLogin/BrandLogin";
import { BrandProfileData } from "routers/types";
import newRequest from "utils/newRequest";
import { TbCurrencyNaira } from "react-icons/tb";

export interface BrandDashboardPageProps {
  className?: string;
}

const BrandDashboardPage: FC<BrandDashboardPageProps> = ({
  className = "",
}) => {
  let [categories] = useState(["Bookings"]);
  const { brand } = useContext(AuthContext);
  const [brandProfile, setBrandProfile] = useState<BrandProfileData | {}>({});

  //
  useEffect(() => {
    const fetchBrandProfile = async () => {
      const response = await newRequest.get(`/brand/${brand._id}`);
      setBrandProfile(response.data);
    };
    fetchBrandProfile();
  }, [brand]);
  //

  const getShortenedWebsite = () => {
    const website = brand?.website;

    if (!website) {
      return "Website not provided";
    }

    if (website.includes("instagram.com")) {
      const username = website.split("?")[0].split("/").pop();
      return `Instagram.com/${username}`;
    } else {
      const domain = website.split("/")[0];
      return domain;
    }
  };

  return (
    <div>
      {brand ? (
        <div className={`nc-AuthorPage  ${className}`} data-nc-id="AuthorPage">
          <Helmet>
            <title>Brand Dashboard | GetCollabo</title>
          </Helmet>

          {/* HEADER */}
          <div className="w-full">
            <div className="relative w-full h-20 md:h-20 2xl:h-32"></div>
            <div className="container -mt-10 lg:-mt-16">
              <div className="relative bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-8 rounded-3xl md:rounded-[40px] shadow-xl flex flex-col md:flex-row">
                <div className="flex-shrink-0 w-32 mt-12 lg:w-44 sm:mt-0">
                  <NcImage
                    src={
                      brand.logo ||
                      "https://res.cloudinary.com/newlink/image/upload/v1678639550/user.jpg"
                    }
                    containerClassName="aspect-w-1 aspect-h-1 rounded-3xl overflow-hidden"
                  />
                </div>
                <div className="flex-grow pt-5 md:pt-1 md:ml-6 xl:ml-14">
                  <div className="max-w-screen-sm ">
                    <h2 className="inline-flex items-center text-2xl font-semibold sm:text-3xl lg:text-4xl">
                      <span>{brand.businessName || "No Business Name"}</span>
                    </h2>
                    <div className="flex items-center text-sm font-medium space-x-2.5 mt-2.5 text-green-600 cursor-pointer">
                      <span className="capitalize text-neutral-700 dark:text-neutral-300">
                        Industry: {brand.industry}
                      </span>
                      <svg
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                      >
                        <path
                          d="M18.05 9.19992L17.2333 12.6833C16.5333 15.6916 15.15 16.9083 12.55 16.6583C12.1333 16.6249 11.6833 16.5499 11.2 16.4333L9.79999 16.0999C6.32499 15.2749 5.24999 13.5583 6.06665 10.0749L6.88332 6.58326C7.04999 5.87492 7.24999 5.25826 7.49999 4.74992C8.47499 2.73326 10.1333 2.19159 12.9167 2.84993L14.3083 3.17493C17.8 3.99159 18.8667 5.71659 18.05 9.19992Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.5498 16.6583C12.0331 17.0083 11.3831 17.3 10.5915 17.5583L9.2748 17.9917C5.96646 19.0583 4.2248 18.1667 3.1498 14.8583L2.08313 11.5667C1.01646 8.25833 1.8998 6.50833 5.20813 5.44167L6.5248 5.00833C6.86646 4.9 7.19146 4.80833 7.4998 4.75C7.2498 5.25833 7.0498 5.875 6.88313 6.58333L6.06646 10.075C5.2498 13.5583 6.3248 15.275 9.7998 16.1L11.1998 16.4333C11.6831 16.55 12.1331 16.625 12.5498 16.6583Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <span className="block mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                      {brand.desc}
                    </span>

                    <a
                      href={`https://${brand.website}`}
                      target="_blank"
                      className="block mt-4 text-sm text-neutral-500 dark:text-neutral-400"
                    >
                      Website: {getShortenedWebsite(brand.website)}
                    </a>
                  </div>
                  <div className="mt-4">
                    <SocialsList dataProp={brand} itemClass="block w-7 h-7" />
                  </div>
                  <div className="inline-flex mt-8 space-x-16 lg:space-x-8 md:space-x-6">
                    <EditBrandButton brandProfile={brandProfile} />
                    <Link to={"/search"}>
                      <ButtonPrimary sizeClass="px-4 py-1.5 sm:px-5">
                        Start Search
                      </ButtonPrimary>
                    </Link>
                  </div>
                </div>
                <div className="absolute flex flex-row-reverse justify-end md:static left-5 top-4 sm:left-auto sm:top-5 sm:right-5">
                  <Link to="/contact">
                    <NftMoreDropdown
                      actions={[
                        {
                          id: "report",
                          name: "Report abuse",
                          icon: "las la-flag",
                        },
                      ]}
                      containerClassName="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:bg-neutral-800 cursor-pointer"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* ====================== END HEADER ====================== */}
          
        {/**
          * 
          {!brandProfile.businessName && !brandProfile.industry && !brandProfile.logo && !brandProfile.desc && brandProfile.termsAndConditionsAccepted === null ? (
            <div className="container py-4 xl:py-6 lg:py-6 lg:pb-28 lg:pt-2">
              <div class="bg-yellow-500 text-white text-xs py-2 px-4 mb-4 rounded animate-pulse">
                <p>Please <Link to="/complete-registration" className="font-semibold underline text-neutral-800">complete your registration</Link> to get full access.</p>
              </div>
            </div>
          ) : (
            ""
          )}
        */} 

          <div className="container py-16 space-y-16 lg:pb-28 lg:pt-20 lg:space-y-28">
            <main>
              <Tab.Group>
                <div className="flex flex-col justify-between lg:flex-row ">
                  <Tab.List className="flex space-x-0 overflow-x-auto sm:space-x-2 ">
                    {categories.map((item) => (
                      <Tab key={item} as={Fragment}>
                        {({ selected }) => (
                          <button
                            className={`flex-shrink-0 block font-medium px-4 py-2 text-sm sm:px-6 sm:py-2.5 capitalize rounded-full focus:outline-none ${
                              selected
                                ? "bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900"
                                : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100/70 dark:hover:bg-neutral-800"
                            } `}
                          >
                            {item}
                          </button>
                        )}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>

                <div className="relative mt-8 overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-10 py-5">
                          Creator
                        </th>

                        <th scope="col" className="px-10 py-3">
                          Status
                        </th>

                        <th scope="col" className="px-10 py-5">
                          Amount
                        </th>
                        <th scope="col" className="px-10 py-5">
                          Contact
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {brandProfile.datatable &&
                        brandProfile.datatable.map((index) => (
                          <tr
                            key={index}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          >
                            <th
                              scope="row"
                              className="flex items-center px-10 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              <img
                                className="w-10 h-10 rounded-md"
                                src={
                                  index.img ||
                                  "https://res.cloudinary.com/newlink/image/upload/v1678639550/user.jpg"
                                }
                                alt=""
                              />
                              <div className="pl-3">
                                <a
                                  href={index.profileLink}
                                  className="text-base font-semibold capitalize"
                                >
                                  {index.creatorUsername || ""}
                                </a>
                                <div className="font-normal text-gray-500">
                                  <span className="text-green-500">
                                    Deliverable Booked:{" "}
                                  </span>
                                  {index.deliverableBooked}
                                </div>
                              </div>
                            </th>

                            <td className="px-10 py-4">
                              {index.bookingStatus ? (
                                <div className="flex items-center">
                                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                                  Active
                                </div>
                              ) : index.bookingStatus === false ? (
                                <div className="flex items-center">
                                  Completed
                                </div>
                              ) : (
                                <div>{""}</div>
                              )}
                            </td>

                            <td className="inline-flex px-10 mb-6">
                              <TbCurrencyNaira className="w-[19px] h-[19px]" />{" "}
                              {index.amountPaid?.toLocaleString() || 0}
                            </td>
                            <td className="px-10 py-4">
                              {index.creatorUsername ? (
                                <Link to={`/book/${index.creatorUsername}`}>
                                  <BiMessageSquareDetail className="w-7 h-7" />
                                </Link>
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </Tab.Group>
            </main>
          </div>
        </div>
      ) : (
        <BrandLogin />
      )}
    </div>
  );
};

export default BrandDashboardPage;
