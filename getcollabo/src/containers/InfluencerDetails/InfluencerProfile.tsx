// @ts-nocheck
import React, { FC, useState, useEffect } from "react";
import Badge from "shared/Badge/Badge";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcImage from "shared/NcImage/NcImage";
import { Helmet } from "react-helmet";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import TimeCountDown from "./TimeCountDown";
import AccordionInfo from "./AccordionInfo";
import { IoCopyOutline, IoCopy } from "react-icons/io5";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useParams } from "react-router-dom";
import { InfluencerData } from "routers/types";
import newRequest from "utils/newRequest";

export interface InfluencerProfileProps {
  className?: string;
  isPreviewMode?: boolean;
}

const InfluencerProfile: FC<InfluencerProfileProps> = ({
  className = "",
  isPreviewMode,
}) => {
  const { username } = useParams();
  const [influencer, setInfluencer] = useState<InfluencerData>({});
  const [error, setError] = useState({});
  const [copy, setCopy] = useState(false);

  //
  useEffect(() => {
    newRequest
      .get(`/influencer/get/${username}`)
      .then((response) => {
        if (response.data) {
          setInfluencer(response.data);
        }
      })
      .catch((err) => setError(err));
  }, [username]);
  //

  return (
    <div
      className={`nc-NftDetailPage ${className}`}
      data-nc-id="NftDetailPage"
    >
      <Helmet>
        <title>My Profile</title>
      </Helmet>
      {/* MAIn */}
      <main className="container flex mt-11 ">
        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2 md:gap-14">
          {/* CONTENT */}
          <div className="space-y-8 lg:space-y-10">
            {/* HEADING */}
            <div className="relative">
              <NcImage
                src={influencer.img}
                containerClassName="aspect-w-11 aspect-h-12 rounded-3xl overflow-hidden"
              />
            </div>

            <AccordionInfo dataProp={influencer} />
          </div>

          {/* SIDEBAR */}
          <div className="pt-10 border-t-2 lg:pt-0 xl:pl-10 border-neutral-200 dark:border-neutral-700 lg:border-t-0">
            <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {/* ---------- 1 ----------  */}
              <div className="space-y-5 pb-9">
                <div className="flex items-center justify-between">
                  <Badge name="Active" color="green" />
                  <a
                    href={`https://twitter.com/intent/tweet?text=You%20can%20now%20easily%20contact%20and%20book%20me%20at%F0%9F%A4%A9:%0Ahttps%3A//getcollabo.io/book/${influencer?.username}%0A%0A%20%23getcollabo%20%23booking%20%23contactme`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Share via Twitter"
                  >
                    <div className="inline-flex">
                      <svg
                        className="w-[19px] h-[19px] sm:h-[19px] sm:w-[19px]"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.44 8.8999C20.04 9.2099 21.51 11.0599 21.51 15.1099V15.2399C21.51 19.7099 19.72 21.4999 15.25 21.4999H8.73998C4.26998 21.4999 2.47998 19.7099 2.47998 15.2399V15.1099C2.47998 11.0899 3.92998 9.2399 7.46998 8.9099"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 15.0001V3.62012"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.35 5.85L12 2.5L8.65002 5.85"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <span className="ml-2.5 text-sm">Share on Twitter</span>
                    </div>
                  </a>
                </div>
                <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
                  {influencer.displayName}
                </h2>

                {/* ---------- 4 ----------  */}
                <div className="flex flex-col space-y-4 text-sm sm:flex-row sm:items-center sm:space-y-0 sm:space-x-8">
                  <div className="flex items-center ">
                    <img
                      src={influencer.img}
                      alt=""
                      className="rounded-full h-9 w-9"
                    />
                    <span className="ml-2.5 text-neutral-500 dark:text-neutral-400 flex flex-col">
                      <span className="flex items-center font-medium capitalize text-neutral-900 dark:text-neutral-200">
                        <span>{influencer.username}</span>
                        {/**
                         *  <VerifyIcon />
                         */}
                      </span>
                      <span className="mt-1 text-sm capitalize">
                        {influencer.industry} Creator
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* ---------- 6 ----------  */}
              <div className="py-9">
                <TimeCountDown dataProp={influencer} />
              </div>

              {/* ---------- 7 ----------  */}
              {/* PRICE */}
              <div className="pt-9 pb-9">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
                  <div className="relative flex flex-col items-baseline flex-1 p-6 border-2 border-green-500 sm:flex-row rounded-xl">
                    <span className="absolute bottom-full translate-y-1 py-1 px-1.5 bg-white dark:bg-neutral-900 text-sm text-neutral-500 dark:text-neutral-400">
                      Min. Book Rate
                    </span>
                    {influencer.deliverable &&
                      influencer.deliverable.length > 0 && (
                        <span className="text-3xl font-semibold text-green-500 xl:text-4xl">
                          NGN{" "}
                          <span className="ml-1">
                            {influencer.deliverable[0].rate?.toLocaleString()}
                          </span>
                        </span>
                      )}
                  </div>
                </div>

                <div className="flex flex-col mt-8 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                  <CopyToClipboard
                    text={`https://getcollabo.io/book/${influencer.username}`}
                    onCopy={() => setCopy(true)}
                  >
                    <ButtonPrimary className="items-center flex-1 space-x-2">
                      {!copy ? (
                        <>
                          <IoCopyOutline size={22} />
                          <p title="Copy profile link">Copy booking link</p>
                        </>
                      ) : (
                        <>
                          <IoCopy size={22} />
                          <p title="Link copied">Link copied</p>
                        </>
                      )}
                    </ButtonPrimary>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* OTHER SECTION */}
      {!isPreviewMode && (
        <div className="container py-24 lg:py-32">
          {/* SECTION 1 */}
          <div className="relative py-24 lg:py-28">
            <BackgroundSection />
            <SectionSubscribe2 />
          </div>
        </div>
      )}
    </div>
  );
};

export default InfluencerProfile;
