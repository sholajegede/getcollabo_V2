import React, { FC } from "react";
import rightImg from "images/newsletter.png";
import NcImage from "shared/NcImage/NcImage";
import Badge from "shared/Badge/Badge";
import ButtonPrimary from "shared/Button/ButtonPrimary";

export interface SectionSubscribe2Props {
  className?: string;
}

const SectionSubscribe2: FC<SectionSubscribe2Props> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionSubscribe2 relative flex flex-col lg:flex-row lg:items-center ${className}`}
      data-nc-id="SectionSubscribe2"
    >
      <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mr-10 lg:w-2/5 lg:order-2">
        <h2 className="text-4xl font-semibold">Never miss an update!</h2>
        <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
          Subscribe to our newsletter and get awesome tips on how best to use influencer marketing to boost your business.
        </span>
        <ul className="mt-10 space-y-4">
          <li className="flex items-center space-x-4">
            <Badge name="01" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Learn more about influencer marketing
            </span>
          </li>
          <li className="flex items-center space-x-4">
            <Badge color="red" name="02" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Get premium discounts
            </span>
          </li>
        </ul>
        <div className="relative max-w-sm mt-10">
          <a href="https://getcollabo.beehiiv.com/subscribe" target="_blank" className="flex mt-6 space-x-2 sm:space-x-5 sm:mt-12">
            <ButtonPrimary className="">
              Subscribe
            </ButtonPrimary>
          </a>
        </div>
      </div>
      <div className="flex-grow xl:mr-20 lg:order-1">
        <NcImage src={rightImg} />
      </div>
    </div>
  );
};

export default SectionSubscribe2;
