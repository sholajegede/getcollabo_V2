// @ts-nocheck
import React from "react";
import { InfluencerData } from "routers/types";
import { RiInstagramFill, RiTwitterFill, RiYoutubeFill } from "react-icons/ri";
import { SiTiktok } from "react-icons/si";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";

interface Props {
  dataProp: InfluencerData;
}

const TimeCountDown: React.FC<Props> = ({ dataProp }) => {
  return (
    <div className="space-y-5">
      <div className="flex items-center space-x-2 text-neutral-500 dark:text-neutral-400 ">
        <span className="leading-none">Audience/Followers</span>
      </div>
      <div className="flex justify-center space-x-8 md:justify-start xl:justify-start lg:justify-start xl:space-x-16 lg:space-x-16 sm:space-x-20">
        {dataProp.tiktokUsername && (
          <div className="flex flex-col items-center">
            <span className="text-2xl font-semibold sm:text-3xl">
              {dataProp.tiktok || "__"}
            </span>
            <div className="w-full mt-1.5 border-b-2 border-neutral-100 dark:border-neutral-700"></div>
            <a
              href={`https://tiktok.com/@${dataProp.tiktokUsername}`}
              target="_blank"
              className="mt-2 sm:text-base"
            >
              <SiTiktok className="w-8 h-7 text-neutral-500 dark:text-neutral-300 hover:text-neutral-400 dark:hover:text-neutral-500" />
            </a>
          </div>
        )}

        {dataProp.instagramUsername && (
          <div className="flex flex-col items-center">
            <span className="text-2xl font-semibold sm:text-3xl">
              {dataProp.instagram || "__"}
            </span>
            <div className="w-full mt-1.5 border-b-2 border-neutral-100 dark:border-neutral-700"></div>
            <a
              href={`https://instagram.com/${dataProp.instagramUsername}`}
              target="_blank"
              className="mt-2 sm:text-base"
            >
              <RiInstagramFill className="w-8 h-8 text-neutral-500 dark:text-neutral-300 hover:text-neutral-400 dark:hover:text-neutral-500" />
            </a>
          </div>
        )}

        {dataProp.youtubeUsername && (
          <div className="flex flex-col items-center">
            <span className="text-2xl font-semibold sm:text-3xl">
              {dataProp.youtube || "__"}
            </span>
            <div className="w-full mt-1.5 border-b-2 border-neutral-100 dark:border-neutral-700"></div>
            <a
              href={`https://youtube.com/@${dataProp.youtubeUsername}`}
              target="_blank"
              className="mt-2 sm:text-base"
            >
              <RiYoutubeFill className="w-8 h-8 text-neutral-500 dark:text-neutral-300 hover:text-neutral-400 dark:hover:text-neutral-500" />
            </a>
          </div>
        )}

        {dataProp.twitterUsername && (
          <div className="flex flex-col items-center">
            <span className="text-2xl font-semibold sm:text-3xl">
              {dataProp.twitter || "__"}
            </span>
            <div className="w-full mt-1.5 border-b-2 border-neutral-100 dark:border-neutral-700"></div>
            <a
              href={`https://twitter.com/${dataProp.twitterUsername}`}
              target="_blank"
              className="mt-2 sm:text-base"
            >
              <RiTwitterFill className="w-8 h-8 text-neutral-500 dark:text-neutral-300 hover:text-neutral-400 dark:hover:text-neutral-500" />
            </a>
          </div>
        )}

        {dataProp.facebookUsername && (
          <div className="flex flex-col items-center">
            <span className="text-2xl font-semibold sm:text-3xl">
              {dataProp.facebook || "__"}
            </span>
            <div className="w-full mt-1.5 border-b-2 border-neutral-100 dark:border-neutral-700"></div>
            <a
              href={`https://facebook.com/${dataProp.facebookUsername}`}
              target="_blank"
              className="mt-2 sm:text-base"
            >
              <FaFacebookF className="w-8 h-7 text-neutral-500 dark:text-neutral-300 hover:text-neutral-400 dark:hover:text-neutral-500" />
            </a>
          </div>
        )}

        {dataProp.linkedinUsername && (
          <div className="flex flex-col items-center">
            <span className="text-2xl font-semibold sm:text-3xl">
              {dataProp.linkedin || "__"}
            </span>
            <div className="w-full mt-1.5 border-b-2 border-neutral-100 dark:border-neutral-700"></div>
            <a
              href={`https://linkedin.com/in/${dataProp.linkedinUsername}`}
              target="_blank"
              className="mt-2 sm:text-base"
            >
              <FaLinkedin className="w-8 h-7 text-neutral-500 dark:text-neutral-300 hover:text-neutral-400 dark:hover:text-neutral-500" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeCountDown;
