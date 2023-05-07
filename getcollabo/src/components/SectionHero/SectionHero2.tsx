import React, { FC } from "react";
import imagePng from "images/header-image.png";
import { Link } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";


export interface SectionHero2Props {
  className?: string;
}

const SectionHero2: FC<SectionHero2Props> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionHero2 flex flex-col-reverse lg:flex-col relative ${className}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="flex flex-col items-start flex-shrink-0 space-y-8 lg:w-1/2 sm:space-y-10 pb-14 lg:pb-36 xl:pb-60 xl:pr-14 lg:mr-10 xl:mr-0">
          <h2 className="mt-10 sm:mt-20 lg:mt-14 xl:mt-14 md:mt-20 font-semibold text-4xl md:text-5xl xl:text-6xl !leading-[114%]">
            Find, book, and manage content creators easily
          </h2>
          <span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400">
            Discover, chat and book content creators. Manage and track campaigns.
            Collaborate from anywhere in the world - all in one place.
            <br />{" "}
          </span>
          <Link to="/search">
            <ButtonPrimary>
              <span>Start your search</span>
              <span>
                <svg className="w-5 h-5 ml-2.5" viewBox="0 0 24 24" fill="none">
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
            </ButtonPrimary>
          </Link>
        </div>
        <div className="flex-grow mb-44">
          <img className="w-full" src={imagePng} alt="hero" />
        </div>
      </div>
    </div>
  );
};

export default SectionHero2;
