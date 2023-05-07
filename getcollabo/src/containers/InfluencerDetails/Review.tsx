// @ts-nocheck
import React, { FC, useEffect } from "react";
import { Tab } from "@headlessui/react";
import newRequest from "utils/newRequest";
import { useQuery } from "@tanstack/react-query";

export interface ReviewPageProps {
  className?: string;
  review?: string;
}

const Review: FC<ReviewPageProps> = ({
  className = "",
  review,
}) => {

  //
  const { isLoading, error, data } = useQuery(
    {
      queryKey: ["brand", review?.brandId],
      queryFn: () =>
        newRequest.get(`/brand/${review?.brandId}`).then((res) => {
          return res.data;
        }),
    },
  );
  //

  const renderTabBidHistory = () => {
    return (
      <article>
        {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
        <div className="flex items-center mb-4 space-x-4">
          <img
            className="w-10 h-10 rounded-full"
            src={data?.logo || "https://res.cloudinary.com/newlink/image/upload/v1678639550/user.jpg"}
            alt=""
          />
          <div className="space-y-1 font-medium dark:text-white">
            <p>{data?.businessName}</p>
          </div>
        </div>
        )}
        <div className="flex items-center mb-1">
          {Array(review?.star)
          .fill()
          .map((item, i) => (
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              key={i}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          ))}
        </div>

        <p className="mt-4 mb-2 text-sm font-light text-gray-500 dark:text-gray-400">
          {review.desc}
        </p>
      </article>
    );
  };

  return (
    <div className="w-full pdx-2 sm:px-0">
      <Tab.Group>
        <Tab.Panels className="mt-10">
          <Tab.Panel
            className={
              "rounded-xl focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60 "
            }
          >
            {renderTabBidHistory()}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Review;
