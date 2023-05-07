import React, { FC } from "react";
import NcImage from "shared/NcImage/NcImage";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import rightImg from "images/join-getcollabo.png";
import Logo from "shared/Logo/Logo";
import { Link } from "react-router-dom";

export interface SectionBecomeAnAuthorProps {
  className?: string;
}

const SectionBecomeAnAuthor: FC<SectionBecomeAnAuthorProps> = ({
  className = "",
}) => {

  return (
    <div
      className={`nc-SectionBecomeAnAuthor relative flex flex-col lg:flex-row items-center  ${className}`}
      data-nc-id="SectionBecomeAnAuthor"
    >
      <div className="flex-shrink-0 mb-16 lg:mb-0 lg:mr-10 lg:w-2/5">
        <Logo className="w-36" />
        <h2 className="font-semibold text-3xl sm:text-4xl xl:text-6xl mt-6 sm:mt-10 !leading-[1.112] tracking-tight">
          Join GetCollabo as a Creator
        </h2>
        <span className="block mt-6 text-neutral-500 dark:text-neutral-400 ">
          Secure brand deals locally and globally. Get paid for your influence.
        </span>
        <Link to="/pricing" className="flex mt-6 space-x-2 sm:space-x-5 sm:mt-12">
          <ButtonPrimary className="">
            Sign up
          </ButtonPrimary>
        </Link>
      </div>
      <div className="flex-grow">
        <NcImage containerClassName="block dark:hidden" src={rightImg} width="100px" />
        <NcImage containerClassName="hidden dark:block" src={rightImg} width="100px" />
      </div>
    </div>
  );
};

export default SectionBecomeAnAuthor;
