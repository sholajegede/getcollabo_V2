import React, { FC } from "react";
import { Link } from "react-router-dom";
import NcImage from "shared/NcImage/NcImage";
import Prices from "./Prices";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { InfluencerType } from "routers/types";

export interface CardNFTProps {
  className?: string;
  isLiked?: boolean;
  influencerProp: InfluencerType;
  index: number;
}

const CardNFT: FC<CardNFTProps> = ({
  className = "",
  isLiked,
  influencerProp,
  index,
}) => {
  return (
    <div
      className={`nc-CardNFT relative flex flex-col group !border-0 [ nc-box-has-hover nc-dark-box-bg-has-hover ] ${className}`}
      data-nc-id="CardNFT"
    >
      <div>
        <Link to={`/book/${influencerProp.username}`}>
          <div className="relative flex-shrink-0 ">
            <div>
              <NcImage
                containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0 rounded-3xl overflow-hidden z-0"
                src={`${influencerProp?.img}?auto`}
                className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
              />
            </div>
            <div className="absolute flex top-3 inset-x-3"></div>
          </div>
        </Link>

        <div className="p-4 py-5 space-y-3">
          <div className="flex justify-between">
            <h2 className={`text-base font-medium flex items-center`}>
              <span className="">{influencerProp.username}</span>
            </h2>
          </div>
          <span className="flex flex-col text-neutral-500 dark:text-neutral-400">
            <span className="text-xs capitalize">
              {influencerProp.industry} Creator
            </span>
          </span>
          <div className="w-full border-b w-2d4 border-neutral-100 dark:border-neutral-700"></div>

          <div className="flex items-end justify-between ">
            <Prices
              priceProp={influencerProp}
              labelTextClassName="bg-white dark:bg-neutral-900 dark:group-hover:bg-neutral-800 group-hover:bg-neutral-50"
            />
            <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
              <Link to={`/book/${influencerProp.username}`}>
                <ButtonPrimary className="flex-1 items-right">
                  Book now
                </ButtonPrimary>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardNFT;
