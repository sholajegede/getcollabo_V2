// @ts-nocheck
import React, { FC, useState, useEffect, useContext } from "react";
import Badge from "shared/Badge/Badge";
import NcImage from "shared/NcImage/NcImage";
import { Helmet } from "react-helmet";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import TimeCountDown from "./TimeCountDown";
import Reviews from "./Reviews";
import AccordionInfo from "./AccordionInfo";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link, useParams, useHistory } from "react-router-dom";
import { InfluencerData } from "routers/types";
import { BiMessageSquareDetail } from "react-icons/bi";
import { AuthContext } from "context/AuthContext";
import newRequest from "utils/newRequest";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { IoCopyOutline, IoCopy } from "react-icons/io5";

export interface InfluencerDetailPageProps {
  className?: string;
  isPreviewMode?: boolean;
}

const InfluencerDetailPage: FC<InfluencerDetailPageProps> = ({
  className = "",
  isPreviewMode,
}) => {
  const { username } = useParams();
  const { brand } = useContext(AuthContext);
  const [influencer, setInfluencer] = useState<InfluencerData>({});
  const [error, setError] = useState({});
  const [copy, setCopy] = useState(false);
  const [newChat, setNewChat] = useState();

  const history = useHistory();

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

  const handleCreateChat = async () => {
    // Check if a chat already exists
    try {
      const response = await newRequest.get(
        `/chat/find/${brand._id}/${influencer._id}`
      );
      const existingChat = response.data;

      if (existingChat) {
        setNewChat(existingChat);
        history.push("/messages");
        return; // Return early to prevent creating a new chat
      }
    } catch (err) {
      setError(err);
      return; // Return early on error
    }

    // Create a new chat if there is no existing chat
    const chat = {
      senderId: brand._id,
      receiverId: influencer._id,
    };

    try {
      const response = await newRequest.post("/chat", chat);
      if (response.data) {
        setNewChat(response.data);
        history.push("/messages");
      }
    } catch (err) {
      setError(err);
    }
  };

  const headerName = influencer?.username ? influencer.username.charAt(0).toUpperCase() + influencer.username.slice(1).toLowerCase() : "Creator";

  console.log(headerName);

  return (
    <>
      <div>
        {brand ? (
          <div
            className={`nc-NftDetailPage ${className}`}
            data-nc-id="NftDetailPage"
          >
            <Helmet>
              <title>Book {headerName}</title>
            </Helmet>
            {/* MAIn */}
            <main className="container flex mt-11 ">
              <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2 md:gap-14">
                {/* CONTENT */}
                <div className="space-y-8 lg:space-y-10">
                  {/* HEADING */}
                  <div className="relative">
                    <NcImage
                      src={`${influencer?.img}?auto`}
                      className="object-cover"
                      containerClassName="aspect-w-11 aspect-h-12 rounded-3xl overflow-hidden"
                    />
                  </div>

                  {influencer && <AccordionInfo dataProp={influencer} />}
                </div>

                {/* SIDEBAR */}
                <div className="pt-10 border-t-2 lg:pt-0 xl:pl-10 border-neutral-200 dark:border-neutral-700 lg:border-t-0">
                  <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                    {/* ---------- 1 ----------  */}
                    <div className="space-y-5 pb-9">
                      <div className="flex items-center justify-between">
                        <Badge name="Active" color="green" />
                        <CopyToClipboard
                          text={`https://getcollabo.io/book/${influencer?.username}`}
                          onCopy={() => setCopy(true)}
                        >
                          <div className="flex items-center space-x-2 text-sm">
                            {!copy ? (
                              <>
                                <IoCopyOutline size={22} />
                                <p title="Copy profile link">Copy profile link</p>
                              </>
                            ) : (
                              <>
                                <IoCopyOutline size={22} />
                                <p title="Link copied">Link copied</p>
                              </>
                            )}
                          </div>
                        </CopyToClipboard>
                      </div>
                      <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
                        {influencer?.displayName}
                      </h2>

                      {/* ---------- 4 ----------  */}
                      <div className="flex flex-col space-y-4 text-sm sm:flex-row sm:items-center sm:space-y-0 sm:space-x-8">
                        <div className="flex items-center ">
                          <img
                            src={influencer?.img}
                            alt=""
                            className="object-cover w-10 h-10 rounded-full"
                          />
                          <span className="ml-2.5 text-neutral-500 dark:text-neutral-400 flex flex-col">
                            <span className="flex items-center font-medium capitalize text-neutral-900 dark:text-neutral-200">
                              <span>{influencer?.username}</span>
                              {/**
                               *  <VerifyIcon />
                               */}
                            </span>
                            <span className="mt-1 text-sm capitalize">
                              {influencer?.industry} Creator
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ---------- 6 ----------  */}
                    {influencer && (
                      <div className="py-9">
                        <TimeCountDown dataProp={influencer} />
                      </div>
                    )}

                    {/* ---------- 7 ----------  */}
                    {/* PRICE */}
                    <div className="pt-9 pb-9">
                      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
                        <div className="relative flex flex-col items-baseline flex-1 p-6 border-2 border-green-500 sm:flex-row rounded-xl">
                          <span className="absolute bottom-full translate-y-1 py-1 px-1.5 bg-white dark:bg-neutral-900 text-sm text-neutral-500 dark:text-neutral-400">
                            Min. Book Rate
                          </span>
                          {influencer?.deliverable &&
                            influencer?.deliverable.length > 0 && (
                              <span className="text-3xl font-semibold text-green-500 xl:text-4xl">
                                NGN{" "}
                                <span className="ml-1">
                                  {typeof influencer.deliverable[0] ===
                                    "object" &&
                                    influencer.deliverable[0].rate?.toLocaleString()}
                                </span>
                              </span>
                            )}
                        </div>
                      </div>

                      <div className="flex flex-col mt-8 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                        <ButtonPrimary
                          onClick={handleCreateChat}
                          className="flex-1"
                        >
                          <BiMessageSquareDetail className="w-[24px] h-[24px]" />
                          <span className="ml-2.5">Send message</span>
                        </ButtonPrimary>
                        <Link
                          to={`/booking/${influencer?.username}`}
                          className="relative inline-flex items-center justify-center flex-1 h-auto px-4 py-3 text-sm font-medium transition-colors bg-white border rounded-full disabled:bg-opacity-70 sm:text-base sm:px-6 border-neutral-200 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M18.04 13.55C17.62 13.96 17.38 14.55 17.44 15.18C17.53 16.26 18.52 17.05 19.6 17.05H21.5V18.24C21.5 20.31 19.81 22 17.74 22H6.26C4.19 22 2.5 20.31 2.5 18.24V11.51C2.5 9.44001 4.19 7.75 6.26 7.75H17.74C19.81 7.75 21.5 9.44001 21.5 11.51V12.95H19.48C18.92 12.95 18.41 13.17 18.04 13.55Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M2.5 12.4101V7.8401C2.5 6.6501 3.23 5.59006 4.34 5.17006L12.28 2.17006C13.52 1.70006 14.85 2.62009 14.85 3.95009V7.75008"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M22.5588 13.9702V16.0302C22.5588 16.5802 22.1188 17.0302 21.5588 17.0502H19.5988C18.5188 17.0502 17.5288 16.2602 17.4388 15.1802C17.3788 14.5502 17.6188 13.9602 18.0388 13.5502C18.4088 13.1702 18.9188 12.9502 19.4788 12.9502H21.5588C22.1188 12.9702 22.5588 13.4202 22.5588 13.9702Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7 12H14"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="ml-2.5">Place booking</span>
                        </Link>
                      </div>
                    </div>

                    {/* ---------- 9 ----------  */}
                    <div className="pt-9">
                      {influencer && <Reviews reviewsProp={influencer} />}
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
        ) : (
          <div
            className={`nc-NftDetailPage ${className}`}
            data-nc-id="NftDetailPage"
          >
            <Helmet>
              <title>Book {influencer?.username || "Creator"}</title>
            </Helmet>
            {/* MAIn */}
            <main className="container flex mt-11 ">
              <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2 md:gap-14">
                {/* CONTENT */}
                <div className="space-y-8 lg:space-y-10">
                  {/* HEADING */}
                  <div className="relative">
                    <NcImage
                      src={influencer?.img}
                      className="object-cover"
                      containerClassName="aspect-w-11 aspect-h-12 rounded-3xl overflow-hidden"
                    />
                  </div>

                  {influencer && <AccordionInfo dataProp={influencer} />}
                </div>

                {/* SIDEBAR */}
                <div className="pt-10 border-t-2 lg:pt-0 xl:pl-10 border-neutral-200 dark:border-neutral-700 lg:border-t-0">
                  <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                    {/* ---------- 1 ----------  */}
                    <div className="space-y-5 pb-9">
                      <div className="flex items-center justify-between">
                        <Badge name="Active" color="green" />
                        <CopyToClipboard
                          text={`https://getcollabo.io/book/${influencer?.username}`}
                          onCopy={() => setCopy(true)}
                        >
                          <div className="flex items-center space-x-2 text-sm">
                            {!copy ? (
                              <>
                                <IoCopyOutline size={22} />
                                <p title="Copy profile link">Copy profile link</p>
                              </>
                            ) : (
                              <>
                                <IoCopy size={22} />
                                <p title="Link copied">Link copied</p>
                              </>
                            )}
                          </div>
                        </CopyToClipboard>
                      </div>
                      <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
                        {influencer?.displayName}
                      </h2>

                      {/* ---------- 4 ----------  */}
                      <div className="flex flex-col space-y-4 text-sm sm:flex-row sm:items-center sm:space-y-0 sm:space-x-8">
                        <div className="flex items-center ">
                          <img
                            src={influencer?.img}
                            alt=""
                            className="object-cover w-10 h-10 rounded-full"
                          />
                          <span className="ml-2.5 text-neutral-500 dark:text-neutral-400 flex flex-col">
                            <span className="flex items-center font-medium capitalize text-neutral-900 dark:text-neutral-200">
                              <span>{influencer?.username}</span>
                              {/**
                               *  <VerifyIcon />
                               */}
                            </span>
                            <span className="mt-1 text-sm capitalize">
                              {influencer?.industry} Creator
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ---------- 6 ----------  */}
                    {influencer && (
                      <div className="py-9">
                        <TimeCountDown dataProp={influencer} />
                      </div>
                    )}

                    {/* ---------- 7 ----------  */}
                    {/* PRICE */}
                    <div className="pt-9 pb-9">
                      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
                        <div className="relative flex flex-col items-baseline flex-1 p-6 border-2 border-green-500 sm:flex-row rounded-xl">
                          <span className="absolute bottom-full translate-y-1 py-1 px-1.5 bg-white dark:bg-neutral-900 text-sm text-neutral-500 dark:text-neutral-400">
                            Min. Book Rate
                          </span>
                          {influencer?.deliverable &&
                            influencer.deliverable.length > 0 && (
                              <span className="text-3xl font-semibold text-green-500 xl:text-4xl">
                                NGN{" "}
                                <span className="ml-1">
                                  {typeof influencer.deliverable[0] ===
                                    "object" &&
                                    influencer.deliverable[0].rate?.toLocaleString()}
                                </span>
                              </span>
                            )}
                        </div>
                      </div>

                      <div className="flex flex-col mt-8 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                        <ButtonPrimary href={"/login-brand"} className="flex-1">
                          <BiMessageSquareDetail className="w-[24px] h-[24px]" />
                          <span className="ml-2.5">Send message</span>
                        </ButtonPrimary>
                        <Link
                          to={"/login-brand"}
                          className="relative inline-flex items-center justify-center flex-1 h-auto px-4 py-3 text-sm font-medium transition-colors bg-white border rounded-full disabled:bg-opacity-70 sm:text-base sm:px-6 border-neutral-200 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M18.04 13.55C17.62 13.96 17.38 14.55 17.44 15.18C17.53 16.26 18.52 17.05 19.6 17.05H21.5V18.24C21.5 20.31 19.81 22 17.74 22H6.26C4.19 22 2.5 20.31 2.5 18.24V11.51C2.5 9.44001 4.19 7.75 6.26 7.75H17.74C19.81 7.75 21.5 9.44001 21.5 11.51V12.95H19.48C18.92 12.95 18.41 13.17 18.04 13.55Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M2.5 12.4101V7.8401C2.5 6.6501 3.23 5.59006 4.34 5.17006L12.28 2.17006C13.52 1.70006 14.85 2.62009 14.85 3.95009V7.75008"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M22.5588 13.9702V16.0302C22.5588 16.5802 22.1188 17.0302 21.5588 17.0502H19.5988C18.5188 17.0502 17.5288 16.2602 17.4388 15.1802C17.3788 14.5502 17.6188 13.9602 18.0388 13.5502C18.4088 13.1702 18.9188 12.9502 19.4788 12.9502H21.5588C22.1188 12.9702 22.5588 13.4202 22.5588 13.9702Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7 12H14"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="ml-2.5">Place booking</span>
                        </Link>
                      </div>
                    </div>

                    {/* ---------- 9 ----------  */}
                    <div className="pt-9">
                      {influencer && <Reviews reviewsProp={influencer} />}
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
        )}
      </div>
    </>
  );
};

export default InfluencerDetailPage;
