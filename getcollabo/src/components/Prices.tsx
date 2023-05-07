import React, { FC } from "react";
import { InfluencerType } from "routers/types";

export interface PricesProps {
  className?: string;
  price?: string;
  contentClass?: string;
  labelTextClassName?: string;
  labelText?: string;
  priceProp: InfluencerType;
}

const Prices: FC<PricesProps> = ({
  className = "pt-3",
  price = Math.random() > 0.5 ? "N 20,000" : "N 22,500",
  contentClass = "py-1.5 md:py-2 px-2.5 md:px-3.5 text-sm sm:text-base font-semibold",
  labelTextClassName = "bg-white",
  labelText = "Book Rate",
  priceProp,
}) => {
  return (
    <div className={`${className}`}>
      <div
        className={`flex items-baseline border-2 border-green-500 rounded-lg relative ${contentClass} `}
      >
        <span
          className={`block absolute font-normal bottom-full translate-y-1 p-1 -mx-1 text-xs text-neutral-500 dark:text-neutral-400 ${labelTextClassName}`}
        >
          {labelText}
        </span>
        {priceProp.deliverable && priceProp.deliverable.length > 0 && (
          <span className=" text-green-500 !leading-none">
            N <span className="ml-1">{priceProp.deliverable[0].rate?.toLocaleString()}</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default Prices;
