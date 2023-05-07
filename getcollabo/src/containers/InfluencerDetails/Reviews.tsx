
import React, { FC, useState, useCallback, useContext } from "react";
import { Tab } from "@headlessui/react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Textarea from "shared/Textarea/Textarea";
import Review from "./Review";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "utils/newRequest";
import { InfluencerData } from "routers/types";
import { AuthContext } from "context/AuthContext";

export interface ReviewInput {
  influencerId: number;
  brandId: number;
  desc: string;
  star: number;
}

export interface ReviewsPageProps {
  className?: string;
  reviewsProp?: InfluencerData;
}

const Reviews: FC<ReviewsPageProps> = ({
  className = "",
  reviewsProp,
}) => {
  const { brand } = useContext(AuthContext)
  const [errorMessage, setErrorMessage] = useState("");
  const [reviewDesc, setReviewDesc] = useState("");
  const [reviewStar, setReviewStar] = useState("");
  const influencerId = reviewsProp ? reviewsProp._id : null;
  const brandId = brand ? brand._id : null;

  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews", influencerId],
    queryFn: () =>
      newRequest.get(`/reviews/${influencerId}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation(
    (review: ReviewInput) => newRequest.post('/reviews', review),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["reviews", influencerId]);
      },
      onError: (error: { response: { data: string } }) => {
        setErrorMessage(error.response.data);
      }
    }
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const desc = e.target[0].value;
      const star = e.target[1].value;
      if (influencerId) {
        mutation.mutate({ influencerId, brandId, desc, star });
        setReviewDesc("");
        setReviewStar("");
      }
    },
    [reviewDesc, reviewStar, influencerId, brandId, mutation]
  );


  return (
    <div className="w-full pdx-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex justify-start pd-1 space-x-2.5 rounded-full border-neutral-300 dark:border-neutral-500">
          <Tab
            className={({ selected }) =>
              `px-3.5 sm:px-8 py-1.5 sm:py-2 text-xs sm:text-sm leading-5 font-medium rounded-xl focus:outline-none focus:ring-2 ring-primary-300 ${
                selected
                  ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
                  : "text-neutral-700 dark:text-neutral-300 bg-neutral-100/70 dark:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100"
              }`
            }
          >
            Reviews
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-10">
          <Tab.Panel
            className={
              "rounded-xl focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60 "
            }
          >
            {isLoading
              ? "loading"
              : error
              ? "Something went wrong!"
              : data.map((review) => <Review key={review._id} review={review} />)}
          </Tab.Panel>
        </Tab.Panels>

        <hr className="mt-10 mb-3" />
        {brand ? (
          <form action="" className="write" onSubmit={handleSubmit}>
          <Textarea placeholder="Add a review..." value={reviewDesc} onChange={(e) => setReviewDesc(e.target.value)} />
          <select name="" id="" className="mt-2 bg-gray-50 border border-neutral-200 text-gray-900 text-sm rounded-xl focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:border-primary-300 block w-full p-2.5 dark:bg-gray-700 dark:border-neutral-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-6000 dark:focus:ring-opacity-25" value={reviewStar} onChange={(e) => setReviewStar(e.target.value)}>
            <option value="">Choose number of stars</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <div className="mt-3 space-x-3">
            <ButtonPrimary type="submit" sizeClass="px-4 py-2 sm:px-5">Send</ButtonPrimary>
          </div>
          {errorMessage && <p className="mt-2 text-sm">{errorMessage}</p>}
        </form>
        ) : (
          <p className="text-sm">Only a brand can create a review</p>
        )}
      </Tab.Group>
    </div>
  );
};

export default Reviews;
