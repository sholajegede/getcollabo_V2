// @ts-nocheck
import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { InfluencerData } from "routers/types";
import { RiInstagramFill, RiTwitterFill, RiYoutubeFill } from "react-icons/ri";
import { SiTiktok } from "react-icons/si";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";
import { AiOutlineFieldTime } from "react-icons/ai";
import NcImage from "shared/NcImage/NcImage";
import NcPlayIcon from "shared/NcPlayIcon/NcPlayIcon";

interface Props {
  dataProp: InfluencerData;
  className?: string;
  itemClassName?: string;
  heading?: string;
  subHeading?: string;
}

const AccordionInfo: React.FC<Props> = ({ dataProp }) => {
  const [isPlay, setIsPlay] = useState(false);

  return (
    <div className="w-full rounded-2xl">
      <Disclosure defaultOpen={false}>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-base font-medium text-left rounded-lg bg-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-500 hover:bg-neutral-200 focus:outline-none focus-visible:ring focus-visible:ring-neutral-500 focus-visible:ring-opacity-75">
              <span>Bio</span>
              <ChevronDownIcon
                className={`${
                  open ? "transform rotate-180" : ""
                } w-5 h-5 text-neutral-500`}
              />
            </Disclosure.Button>
            {dataProp.about ? (
              <Disclosure.Panel
                className="px-4 pt-4 text-sm text-neutral-500 dark:text-neutral-400"
                as="p"
              >
                {dataProp.about}
              </Disclosure.Panel>
            ) : (
              <Disclosure.Panel
                className="px-4 pt-4 pb-2 text-sm text-neutral-500 dark:text-neutral-400"
                as="p"
              >
                Bio is empty.
              </Disclosure.Panel>
            )}
          </>
        )}
      </Disclosure>

      <Disclosure defaultOpen={false} as="div" className="mt-5 md:mt-8">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-base font-medium text-left rounded-lg bg-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-500 hover:bg-neutral-200 focus:outline-none focus-visible:ring focus-visible:ring-neutral-500 focus-visible:ring-opacity-75">
              <span>Other Interests</span>
              <ChevronDownIcon
                className={`${
                  open ? "transform rotate-180" : ""
                } w-5 h-5 text-neutral-500`}
              />
            </Disclosure.Button>
            {dataProp.otherInterests ? (
              <Disclosure.Panel
                className="px-4 pt-4 text-sm capitalize text-neutral-500 dark:text-neutral-400"
                as="p"
              >
                {dataProp.otherInterests}
              </Disclosure.Panel>
            ) : (
              <Disclosure.Panel
                className="px-4 pt-4 pb-2 text-sm text-neutral-500 dark:text-neutral-400"
                as="p"
              >
                No other Interests available.
              </Disclosure.Panel>
            )}
          </>
        )}
      </Disclosure>

      <Disclosure defaultOpen={false} as="div" className="mt-5 md:mt-8">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 font-medium text-left rounded-lg bg-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-500 hover:bg-neutral-200 focus:outline-none focus-visible:ring focus-visible:ring-neutral-500 focus-visible:ring-opacity-75">
              <span>Deliverables</span>
              <ChevronDownIcon
                className={`${
                  open ? "transform rotate-180" : ""
                } w-5 h-5 text-neutral-500`}
              />
            </Disclosure.Button>
            {Array.isArray(dataProp.deliverable) &&
            dataProp.deliverable.length > 0 ? (
              dataProp.deliverable.map((item, index) => (
                <Disclosure.Panel
                  key={index}
                  className="flex flex-col px-4 pt-4 pb-2 overflow-hidden text-xs text-neutral-500 dark:text-neutral-400"
                >
                  {item.rate && (
                    <span className="text-green-500">
                      NGN {item.rate?.toLocaleString()}
                    </span>
                  )}
                  {item.deliveryTime && (
                    <span className="inline-flex mt-1 text-xs text-neutral-900 dark:text-neutral-100">
                      <AiOutlineFieldTime className="w-4 h-4 mr-1" /> Delivery
                      Time:{" "}
                      <span className="ml-1 text-green-500">
                        {item.deliveryTime}
                      </span>
                    </span>
                  )}
                  {item.description && (
                    <span className="mt-1 text-base text-neutral-900 dark:text-neutral-100">
                      {item.description}
                    </span>
                  )}
                </Disclosure.Panel>
              ))
            ) : (
              <Disclosure.Panel
                key="empty"
                className="flex flex-col px-4 pt-4 pb-2 overflow-hidden text-xs text-neutral-500 dark:text-neutral-400"
              >
                <span className="text-base text-neutral-900 dark:text-neutral-100">
                  No deliverables available
                </span>
              </Disclosure.Panel>
            )}
          </>
        )}
      </Disclosure>

      <Disclosure defaultOpen={false} as="div" className="mt-5 md:mt-8">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 font-medium text-left rounded-lg bg-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-500 hover:bg-neutral-200 focus:outline-none focus-visible:ring focus-visible:ring-neutral-500 focus-visible:ring-opacity-75">
              <span>Socials</span>
              <ChevronDownIcon
                className={`${
                  open ? "transform rotate-180" : ""
                } w-5 h-5 text-neutral-500`}
              />
            </Disclosure.Button>
            {dataProp.tiktokUsername ||
            dataProp.instagramUsername ||
            dataProp.youtubeUsername ||
            dataProp.twitterUsername ||
            dataProp.linkedinUsername ||
            dataProp.facebookUsername ? (
              <Disclosure.Panel className="flex flex-col px-4 pt-4 pb-2 overflow-hidden text-xs text-neutral-500 dark:text-neutral-400">
                <div className="text-sm text-primary-6000 hover:text-primary-700 dark:hover:text-primary-700 dark:text-primary-6000">
                  {dataProp.tiktokUsername && (
                    <a
                      href={`https://tiktok.com/@${dataProp.tiktokUsername}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center"
                    >
                      <SiTiktok className="w-6 h-6 text-neutral-500 hover:text-neutral-400" />
                      <span className="ml-2 font-medium text-neutral-500 hover:text-neutral-400">
                        TikTok
                      </span>
                    </a>
                  )}

                  {dataProp.instagramUsername && (
                    <a
                      href={`https://instagram.com/${dataProp.instagramUsername}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center mt-4"
                    >
                      <RiInstagramFill className="w-6 h-6 text-neutral-500 hover:text-neutral-400" />
                      <span className="ml-2 font-medium text-neutral-500 hover:text-neutral-400">
                        Instagram
                      </span>
                    </a>
                  )}

                  {dataProp.youtubeUsername && (
                    <a
                      href={`https://youtube.com/@${dataProp.youtubeUsername}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center mt-4"
                    >
                      <RiYoutubeFill className="w-6 h-6 text-neutral-500 hover:text-neutral-400" />
                      <span className="ml-2 font-medium text-neutral-500 hover:text-neutral-400">
                        YouTube
                      </span>
                    </a>
                  )}

                  {dataProp.twitterUsername && (
                    <a
                      href={`https://twitter.com/${dataProp.twitterUsername}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center mt-4"
                    >
                      <RiTwitterFill className="w-6 h-6 text-neutral-500 hover:text-neutral-400" />
                      <span className="ml-2 font-medium text-neutral-500 hover:text-neutral-400">
                        Twitter
                      </span>
                    </a>
                  )}

                  {dataProp.facebookUsername && (
                    <a
                      href={`https://facebook.com/${dataProp.facebookUsername}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center mt-4"
                    >
                      <FaFacebookF className="w-6 h-6 text-neutral-500 hover:text-neutral-400" />
                      <span className="ml-2 font-medium text-neutral-500 hover:text-neutral-400">
                        Facebook
                      </span>
                    </a>
                  )}

                  {dataProp.linkedinUsername && (
                    <a
                      href={`https://linkedin.com/in/${dataProp.linkedinUsername}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center mt-4"
                    >
                      <FaLinkedin className="w-6 h-6 text-neutral-500 hover:text-neutral-400" />
                      <span className="ml-2 font-medium text-neutral-500 hover:text-neutral-400">
                        LinkedIn
                      </span>
                    </a>
                  )}
                </div>
              </Disclosure.Panel>
            ) : (
              <Disclosure.Panel
                className="px-4 pt-4 pb-2 text-sm text-neutral-500 dark:text-neutral-400"
                as="p"
              >
                No social accounts available.
              </Disclosure.Panel>
            )}
          </>
        )}
      </Disclosure>

      <Disclosure defaultOpen={false} as="div" className="mt-5 md:mt-8">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-base font-medium text-left rounded-lg bg-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-500 hover:bg-neutral-200 focus:outline-none focus-visible:ring focus-visible:ring-neutral-500 focus-visible:ring-opacity-75">
              <span>🎬 Sample Deliverable</span>
              <ChevronDownIcon
                className={`${
                  open ? "transform rotate-180" : ""
                } w-5 h-5 text-neutral-500`}
              />
            </Disclosure.Button>

            {dataProp.sampleVideo ? (
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-neutral-500 dark:text-neutral-400">
                <div className="group aspect-w-16 aspect-h-16 sm:aspect-h-9 bg-neutral-800 rounded-3xl overflow-hidden border-4 border-white dark:border-neutral-900 sm:rounded-[50px] sm:border-[10px] z-0">
                  {isPlay ? (
                    <iframe
                      src={dataProp.sampleVideo}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                      allowFullScreen
                      className="rounded-3xl"
                    ></iframe>
                  ) : (
                    <>
                      <div
                        onClick={() => setIsPlay(true)}
                        className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
                      >
                        <NcPlayIcon />
                      </div>
                      <NcImage
                        containerClassName="absolute inset-0 rounded-3xl overflow-hidden z-0"
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-100 "
                        alt="Creator video content"
                        src="https://res.cloudinary.com/newlink/image/upload/v1669124577/upload/kkfnk4kefdkahpmdp2pt.jpg"
                      />
                    </>
                  )}
                </div>
              </Disclosure.Panel>
            ) : (
              <Disclosure.Panel
                className="px-4 pt-4 pb-2 text-sm text-neutral-500 dark:text-neutral-400"
                as="p"
              >
                No sample deliverable available.
              </Disclosure.Panel>
            )}
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default AccordionInfo;
