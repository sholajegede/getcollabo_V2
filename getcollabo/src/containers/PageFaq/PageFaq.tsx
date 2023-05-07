// @ts-nocheck
import React, { FC, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import FaqHeading from "shared/Heading/FaqHeading";
import NcImage from "shared/NcImage/NcImage";
import NcPlayIcon from "shared/NcPlayIcon/NcPlayIcon";
import isSafariBrowser from "utils/isSafariBrowser";
import Linkify from 'react-linkify';

export interface PageFaqProps {
  className?: string;
  videos?: string[];
}

export interface UserItem {
  title: string;
  text: string;
  thumbnail: string;
  videoTitle: string;
  videoId: string;
}

export interface SectionVideosProps {
  videos?: UserItem[];
  className?: string;
}

const creator: UserItem[] = [
  {
    title: "What is GetCollabo for Creators?",
    text: "GetCollabo connects creators with brands for collaboration opportunities, expanding their reach and increasing earnings. Brands can discover and connect with talented creators who align with their marketing goals.",
    videoTitle: "🎬 Quick Demonstration",
    videoId: "",
    thumbnail:
      "https://res.cloudinary.com/newlink/image/upload/v1674299335/image-getcollabo_c1qrop.png",
  },
  {
    title: "How do I signup to GetCollabo?",
    text: "Sign up for GetCollabo at getcollabo.io/create-profile. Create an account, complete your profile, connect your social media accounts by typing in your username for each, and you're ready to go. Get your own unique profile and start getting booked!",
    videoTitle: "🎬 How to Sign Up",
    videoId: "",
    thumbnail:
      "https://res.cloudinary.com/newlink/image/upload/v1674299335/image-getcollabo_c1qrop.png",
  },
  {
    title: "Who can use the GetCollabo Platform?",
    text: "We welcome creators from all walks of life and with all levels of experience. You can use the GetCollabo platform to get discovered, contacted, and booked while managing all your collaborations in one place.",
    videoTitle: "",
    videoId: "",
    thumbnail: "",
  },
  {
    title: "How many social platforms can I connect to my profile?",
    text: "You can connect up to five social media platforms to your GetCollabo profile. We currently support the following platforms: Instagram, YouTube, TikTok, Twitter and LinkedIn.",
    videoTitle: "",
    videoId: "",
    thumbnail: "",
  },
  {
    title: "Which brands use GetCollabo to find creators?",
    text: "We work with a wide range of brands across different industries and niches.",
    videoTitle: "",
    videoId: "",
    thumbnail: "",
  },
  {
    title: "How do I get paid?",
    text: "Creators can get paid through our platform once they have completed a collaboration project with a brand. Payment terms and options may vary depending on the specific collaboration and the terms agreed upon by the creator and the brand.",
    videoTitle: "",
    videoId: "",
    thumbnail: "",
  },
  {
    title: "Do you take a percentage on my earnings?",
    text: "We don't take a cut of your earnings. Creators pay a monthly subscription for our platform's benefits. We offer a generous 2-month free plan. Check out our pricing options at getcollabo.io/pricing.",
    videoTitle: "",
    videoId: "",
    thumbnail: "",
  },
  {
    title: "How do I get bookings?",
    text: "Once you've created your GetCollabo profile and connected your social media accounts, you'll be able to get full visibility and exposure allowing you to get collaboration opportunities with brands.",
    videoTitle: "",
    videoId: "",
    thumbnail: "",
  },
  {
    title: "How do I notify the brand when I have completed the deliverable?",
    text: "You can notify the brand through our platform by submitting the completed deliverable for review. Once the brand has reviewed and approved the deliverable, you'll receive payment for the collaboration.",
    videoTitle: "",
    videoId: "",
    thumbnail: "",
  },
  {
    title: "Is it safe to share my personal information on GetCollabo?",
    text: "Yes, we take the privacy and security of our users very seriously. We use industry-standard encryption and security measures to protect your personal information and ensure that your data is safe.",
    videoTitle: "",
    videoId: "",
    thumbnail: "",
  },
  {
    title: "Can I message other content creators on GetCollabo?",
    text: "Currently, messaging other creators on GetCollabo is unavailable. We recognize its potential for connecting, sharing tips and advice, and collaborating, so we plan to add this feature soon.",
    videoTitle: "",
    videoId: "",
    thumbnail: "",
  },
  {
    title: "How does GetCollabo protect creators from scams?",
    text: "Our platform has safeguards against scams and frauds. We vet all brands, monitor collaborations for ethical practices, and provide support to help creators avoid scams.",
    videoTitle: "",
    videoId: "",
    thumbnail: "",
  },
  {
    title:
      "Can I collaborate with creators from other countries on GetCollabo?",
    text: "We don't yet allow creators to collaborate across borders on GetCollabo, but we plan to add this feature soon. We value creators from all over the world and prioritize cross-cultural collaboration.",
    videoTitle: "",
    videoId: "",
    thumbnail: "",
  },
  {
    title:
      "What support/resources are available to creators on GetCollabo?",
    text: "GetCollabo supports creators in various ways with educational materials, personal branding tips, and contract negotiation assistance. Our team provides personalized and responsive support and aims to empower creators to reach their full potential and build lasting partnerships with brands on our platform.",
    videoTitle: "",
    videoId: "",
    thumbnail: "",
  },
];

const brand: UserItem[] = [
  {
    title: "What is GetCollabo for Brands?",
    text: "GetCollabo connects brands with content creators for collaborations. Brands can create easily find, contact, and book creators on the platform. We also securely handle communication, deliverables, and payments, making the collaboration process seamless and efficient.",
    videoTitle: "",
    videoId: "",
    thumbnail: "",
  },
  {
    title: "How can I sign up as a brand on GetCollabo?",
    text: "To sign up as a brand on GetCollabo, simply click on this link: getcollabo.io/create-brand. From there, follow the instructions to create an account and complete your brand registration. Once your account is approved, you get full access to all our features.",
    videoTitle: "",
    videoId: "",
    thumbnail: "",
  },
  {
    title:
      "What types of collaborations can I get with creators on GetCollabo?",
    text: "You can get a variety of collaborations with creators on GetCollabo, such as sponsored posts on social media, blog posts, videos, product reviews, and more. You can easily communicate with creators on our platform to set campaign goals and choose the content you want them to create.",
    videoTitle: "",
    videoId: "",
    thumbnail: "",
  },
  {
    title: "How many creators can I collaborate with at once on GetCollabo?",
    text: "There is no limit to the number of creators you can collaborate with on GetCollabo. You can choose to work with one or multiple creators, depending on the needs of your campaign.",
    videoTitle: "",
    videoId: "",
    thumbnail: "",
  },
  {
    title:
      "How does GetCollabo ensure creator content quality?",
    text: "We rigorously vet creators to ensure quality and accept only those who meet our standards. Brands can request revisions to ensure content meets their expectations.",
    videoTitle: "",
    videoId: "",
    thumbnail: "",
  },
  {
    title:
      "How are creator deliverables reviewed and approved on GetCollabo?",
    text: "Creators submit deliverables through the platform and brands can review and provide feedback. Upon approval, creators receive payment.",
    videoTitle: "",
    videoId: "",
    thumbnail: "",
  },
  {
    title:
      "How do I communicate with creators throughout the collaboration process?",
    text: "GetCollabo's messaging system enables seamless communication between brands and creators during collaboration to address any issues or concerns.",
    videoTitle: "",
    videoId: "",
    thumbnail: "",
  },
  {
    title:
      "What are the payment terms and deliverable options for working with creators on GetCollabo?",
    text: "Payment terms and options should be discussed with creators before collaboration begins. GetCollabo handles payments and releases them upon approval of deliverables.",
    videoTitle: "",
    videoId: "",
    thumbnail: "",
  },
  {
    title:
      "How does GetCollabo handle disputes that arise during collaborations with creators?",
    text: "GetCollabo has a dispute resolution process to handle issues during collaboration. It works with both parties to find a fair solution.",
    videoTitle: "",
    videoId: "",
    thumbnail: "",
  },
  {
    title:
      "Can I track the status of my collaborations with creators on GetCollabo?",
    text: "Yes, GetCollabo provides detailed analytics and performance metrics for each collaboration, allowing you to track the success of your campaigns and adjust your strategy accordingly.",
    videoTitle: "",
    videoId: "",
    thumbnail: "",
  },
  {
    title: "How does GetCollabo protect brands from scams?",
    text: "GetCollabo verifies creators for quality and fraud prevention measures.",
    videoTitle: "",
    videoId: "",
    thumbnail: "",
  },
  {
    title:
      "Is it possible to negotiate rates or terms with creators on GetCollabo?",
    text: "Yes, brands and creators can negotiate terms via GetCollabo. It provides a platform for communication and custom deliverable, rate, and time entry.",
    videoTitle: "",
    videoId: "",
    thumbnail: "",
  },
  {
    title:
      "Can I collaborate with creators from different countries or regions on GetCollabo?",
    text: "GetCollabo is a global platform connecting creators and brands worldwide. We welcome creators from all regions and offer opportunities for brands to reach a global audience.",
    videoTitle: "",
    videoId: "",
    thumbnail: "",
  },
  {
    title:
      "What support/resources are available to brands on GetCollabo?",
    text: "GetCollabo provides collaboration management, communication tools, access to diverse creators, and materials to help brands negotiate and optimize their campaigns.",
    videoTitle: "",
    videoId: "",
    thumbnail: "",
  },
];

const PageFaq: FC<PageFaqProps> = ({ videos = creator, className = "" }) => {
  const [selectedUser, setSelectedUser] = useState("creator");

  const handleUserSelection = (userType: string) => {
    setSelectedUser(userType);
  };

  const [isPlay, setIsPlay] = useState(false);
  const [currentVideo] = useState(0);

  const renderCreatorFaq = (
    creator: UserItem = videos[currentVideo],
    index: number
  ) => {
    return (
      <div key={index} className="relative h-full px-6 py">
        <Disclosure defaultOpen={false}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-base font-medium text-left rounded-lg bg-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-500 hover:bg-neutral-200 focus:outline-none focus-visible:ring focus-visible:ring-neutral-500 focus-visible:ring-opacity-75">
                <span>{creator.title}</span>
                <ChevronDownIcon
                  className={`${
                    open ? "transform rotate-180" : ""
                  } w-5 h-5 text-neutral-500`}
                />
              </Disclosure.Button>

              <Disclosure.Panel
                className="px-4 pt-4 pb-2 text-sm text-neutral-500 dark:text-neutral-400"
                as="p"
              >
                <Linkify
                  componentDecorator={(decoratedHref, decoratedText, key) => (
                    <a href={decoratedHref} key={key} className="font-semibold underline text-primary-6000">
                      {decoratedText}
                    </a>
                  )}
                >
                  {creator.text}
                </Linkify>
                
                {creator.videoId && (
                  <>
                    <FaqHeading>{creator.videoTitle}</FaqHeading>

                    <div
                      className="group aspect-w-16 aspect-h-16 sm:aspect-h-9 bg-neutral-800 rounded-xl overflow-hidden border-4 border-white dark:border-neutral-900 sm:rounded-[50px] sm:border-[10px] z-0"
                      title={creator.videoTitle}
                    >
                      {isPlay ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${
                            creator.videoId
                          }?autoplay=1${isSafariBrowser() ? "&mute=1" : ""}`}
                          title={creator.videoTitle}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                          allowFullScreen
                          className="rounded-xl"
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
                            containerClassName="absolute inset-0 rounded-xl overflow-hidden z-0"
                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-100 "
                            src={creator.thumbnail}
                            title={creator.videoTitle}
                            alt={creator.videoTitle}
                          />
                        </>
                      )}
                    </div>
                  </>
                )}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    );
  };

  const renderBrandFaq = (
    brand: UserItem = videos[currentVideo],
    index: number
  ) => {
    return (
      <div key={index} className="relative h-full px-6 py">
        <Disclosure defaultOpen={false}>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-base font-medium text-left rounded-lg bg-neutral-100 dark:bg-neutral-700 dark:hover:bg-neutral-500 hover:bg-neutral-200 focus:outline-none focus-visible:ring focus-visible:ring-neutral-500 focus-visible:ring-opacity-75">
                <span>{brand.title}</span>
                <ChevronDownIcon
                  className={`${
                    open ? "transform rotate-180" : ""
                  } w-5 h-5 text-neutral-500`}
                />
              </Disclosure.Button>

              <Disclosure.Panel
                className="px-4 pt-4 pb-2 text-sm text-neutral-500 dark:text-neutral-400"
                as="p"
              >
                <Linkify
                  componentDecorator={(decoratedHref, decoratedText, key) => (
                    <a href={decoratedHref} key={key} className="font-semibold underline text-primary-6000">
                      {decoratedText}
                    </a>
                  )}
                >
                  {brand.text}
                </Linkify>
                
                {brand.videoId && (
                  <>
                    <FaqHeading>{brand.videoTitle}</FaqHeading>

                    <div
                      className="group aspect-w-16 aspect-h-16 sm:aspect-h-9 bg-neutral-800 rounded-xl overflow-hidden border-4 border-white dark:border-neutral-900 sm:rounded-[50px] sm:border-[10px] z-0"
                      title={brand.videoTitle}
                    >
                      {isPlay ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${
                            brand.videoId
                          }?autoplay=1${isSafariBrowser() ? "&mute=1" : ""}`}
                          title={brand.videoTitle}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                          allowFullScreen
                          className="rounded-xl"
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
                            containerClassName="absolute inset-0 rounded-xl overflow-hidden z-0"
                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-100 "
                            src={brand.thumbnail}
                            title={brand.videoTitle}
                            alt={brand.videoTitle}
                          />
                        </>
                      )}
                    </div>
                  </>
                )}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    );
  };

  return (
    <div
      className={`nc-PageFaq container pb-24 lg:pb-32 ${className}`}
      data-nc-id="PageFaq"
    >
      <Helmet>
        <title>FAQs | GetCollabo</title>
      </Helmet>
      <header className="max-w-2xl mx-auto my-16 text-center">
        <h2 className="flex items-center text-3xl leading-[115%] md:text-4xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          FAQs
        </h2>
      </header>

      <div className="flex items-center justify-center space-x-4">
        {selectedUser === "creator" ? (
          <ButtonPrimary onClick={() => handleUserSelection("creator")}>
            <span className="font-medium">Creators</span>
          </ButtonPrimary>
        ) : (
          <ButtonSecondary onClick={() => handleUserSelection("creator")}>
            <span className="font-medium">Creators</span>
          </ButtonSecondary>
        )}
        {selectedUser === "brand" ? (
          <ButtonPrimary onClick={() => handleUserSelection("brand")}>
            <span className="font-medium">Brands</span>
          </ButtonPrimary>
        ) : (
          <ButtonSecondary onClick={() => handleUserSelection("brand")}>
            <span className="font-medium">Brands</span>
          </ButtonSecondary>
        )}
      </div>

      <div className="flex items-center justify-center">
        <div className="grid max-w-3xl grid-cols-1 gap-8 mt-12">
          {selectedUser === "creator"
            ? creator.map((item, index) => renderCreatorFaq(item, index))
            : brand.map((item, index) => renderBrandFaq(item, index))}
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <span className="block text-center xl:text-end md:text-end text-neutral-700 dark:text-neutral-300">
          Still have questions? {` `}
          <Link
            className="text-green-600 underline hover:no-underline"
            to="/contact"
          >
            Contact us
          </Link>
        </span>
      </div>
    </div>
  );
};

export default PageFaq;
