//@ts-nocheck
import React, { FC } from "react";
import { Link } from "react-router-dom";
import NextPrev from "shared/NextPrev/NextPrev";
import NcImage from "shared/NcImage/NcImage";
import Avatar from "shared/Avatar/Avatar";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import LikeButton from "components/LikeButton";
import { nftsLargeImgs } from "contains/fakeData";
import TimeCountDown from "./TimeCountDown";
import VerifyIcon from "components/VerifyIcon";
import useFetch from "hooks/useFetch";

export interface CardLarge1Props {
  className?: string;
  onClickNext?: () => void;
  onClickPrev?: () => void;
  isShowing?: boolean;
  featuredImgUrl?: string;
}

const CardLarge1: FC<CardLarge1Props> = ({
  className = "",
  isShowing = true,
  onClickNext = () => {},
  onClickPrev = () => {},
  featuredImgUrl = nftsLargeImgs[0],
}) => {
  const randomTitle = [
    "Influencer of the month",
    "Influencer of the month",
    "Influencer of the month",
  ];


  const { data } = useFetch("http://localhost:8800/app/influencers?influencerOfTheMonth=true&limit=3");


  return (
    <div className={`nc-CardLarge1 nc-CardLarge1--hasAnimation relative flex flex-col-reverse lg:flex-row justify-end ${className}`}>
      <div className="z-10 w-full -mt-2 lg:absolute lg:left-0 lg:top-1/2 lg:transform lg:-translate-y-1/2 lg:mt-0 sm:px-5 lg:px-0 lg:max-w-lg ">
        <div className="p-4 space-y-3 bg-white shadow-lg nc-CardLarge1__left sm:p-8 xl:py-14 md:px-10 dark:bg-neutral-900 rounded-3xl sm:space-y-8 ">
          {/* TITLE */}
          <h2 className="text-2xl font-semibold lg:text-3xl 2xl:text-5xl ">
            <Link to={"/influencer-details"} title="Walking On Air">
              {randomTitle[Math.floor(Math.random() * randomTitle.length)]}
            </Link>
          </h2>

          {/* AUTHOR AND COLLECTION */}
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-12">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-10 h-10">
                <Avatar sizeClass="w-10 h-10" />
              </div>
              <div className="ml-3">
                <div className="text-xs dark:text-neutral-400">{data.industry} Influencer</div>
                <div className="flex items-center text-sm font-semibold">
                  <span>{data.username}</span>
                  <VerifyIcon />
                </div>
              </div>
            </div>
          </div>

          {/* PRICE */}
          <div className="pt-6">
            <div className="relative flex flex-col items-baseline p-6 border-2 border-green-500 sm:flex-row rounded-xl">
              <span className="block absolute bottom-full translate-y-1.5 py-1 px-1.5 bg-white dark:bg-neutral-900 text-sm text-neutral-500 dark:text-neutral-400 ring ring-offset-0 ring-white dark:ring-neutral-900">
                Booking Rate
              </span>
              <span className="text-3xl font-semibold text-green-500 xl:text-4xl">
                NGN {data.bookingStartRate}
              </span>
              <span className="text-lg text-neutral-400 sm:ml-3.5">
                (≈ 2 Promotions)
              </span>
            </div>
          </div>

          {/* AUCTION TIME */}
          <TimeCountDown />

          <div className="w h-[1px] bg-neutral-100 dark:bg-neutral-700"></div>

          {/* DESCRIPTION */}
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
            <ButtonPrimary href={"/influencer"} className="flex-1">
              Book
            </ButtonPrimary>
            <ButtonSecondary href={"/influencer"} className="flex-1">
              Add to wishlist
            </ButtonSecondary>
          </div>
        </div>
        <div className="p-4 sm:pt-8 sm:px-10 ">
          <NextPrev
            btnClassName="w-11 h-11 text-xl"
            onClickNext={onClickNext}
            onClickPrev={onClickPrev}
          />
        </div>
      </div>

      <div className="w-full lg:w-[64%] relative ">
        <div className="nc-CardLarge1__right ">
          <Link to={`/influencer/${data._id}`}>
            <NcImage
              containerClassName="aspect-w-1 aspect-h-1 relative"
              className="absolute inset-0 object-cover rounded-3xl sm:rounded-[40px] border-4 sm:border-[14px] border-white dark:border-neutral-800"
              src={featuredImgUrl}
              alt={"title"}
            />
          </Link>

          
          {/* META FAVORITES */}
          <LikeButton className="absolute right-3 top-3 sm:right-7 sm:top-7" />
        </div>
      </div>
    </div>
  );
};

export default CardLarge1;
