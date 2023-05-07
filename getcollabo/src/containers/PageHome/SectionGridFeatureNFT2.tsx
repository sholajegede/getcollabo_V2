//@ts-nocheck
import React, { FC, useState, useEffect } from "react";
import HeaderFilterSection from "components/HeaderFilterSection";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcImage from "shared/NcImage/NcImage";
import { Link } from "react-router-dom";
import newRequest from "utils/newRequest";

//
export interface SectionGridFeatureNFT2Props {}

const SectionGridFeatureNFT2: FC<SectionGridFeatureNFT2Props> = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  //
  useEffect(() => {
    const fetchData = async () => {
      const response = await newRequest.get("/influencer/featured");
      if (Array.isArray(response.data)) {
        setData(response.data);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  //

  return (
    <div className="relative nc-SectionGridFeatureNFT2">
      <HeaderFilterSection />
      <div className={`grid gap-6 lg:gap-8 sm:grid-cols-2 xl:grid-cols-3`}>
        {loading
          ? "Loading"
          : data && data.length > 0
          ? data.map((item) => (
              <div
                key={item._id}
                className={`nc-CardNFT2 relative bg-white dark:bg-neutral-900 rounded-3xl flex flex-col group p-2.5`}
                data-nc-id="CardNFT2"
              >
                <div className="relative flex-shrink-0 ">
                  <div>
                    <Link to={`/book/${item.username}`}>
                      <NcImage
                        containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0 rounded-3xl overflow-hidden z-0"
                        src={`${item.img}?auto`}
                        className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
                      />
                    </Link>
                  </div>

                  <div className="absolute left-[-1px] bottom-[-0.4px] ">
                    <svg
                      className="text-white dark:text-neutral-900 w-64 md:w-[281px]"
                      width="281"
                      viewBox="0 0 281 99"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 0V99H258.059C248.54 99 239.92 93.3743 236.089 84.6606L205.167 14.3394C201.335 5.62568 192.716 0 183.197 0H0Z"
                        fill="currentColor"
                      />
                    </svg>

                    <div className="absolute bottom-0 w-48 mb-2 left-4">
                      <h2 className={`text-base font-medium flex items-center`}>
                        <span className="capitalize">{item.username}</span>
                      </h2>
                      <div className="flex items-end justify-between w-full mt-2 ">
                        <span className="block text-xs capitalize text-neutral-500 dark:text-neutral-400">
                          {item.industry} Creator
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
      <div className="flex items-center justify-center mt-16">
        <Link to="/search">
          <ButtonPrimary>Show me more</ButtonPrimary>
        </Link>
      </div>
    </div>
  );
};

export default SectionGridFeatureNFT2;
