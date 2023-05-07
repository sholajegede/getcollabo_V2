import { CheckIcon } from "@heroicons/react/solid";
import React, { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { TbCurrencyNaira } from "react-icons/tb";
import { Helmet } from "react-helmet";

export interface PageSubcriptionProps {
  className?: string;
}

export interface PricingItem {
  isPopular: boolean;
  name: string;
  pricing: string;
  desc: string;
  per: string;
  features: string[];
}

const pricingList: PricingItem[] = [
  {
    isPopular: false,
    name: "Starter Creator",
    pricing: "0",
    per: "/month (2 months free)",
    features: ["Full autonomy", "Email messaging", "Secure payments", "Premium support"],
    desc: `Just started testing the waters of earning as a creator🫣.`,
  },
  {
    isPopular: false,
    name: "Upgrade Creator",
    pricing: "2,900",
    per: "/month",
    features: [
      "Everything in Starter",
      "In-app messaging",
      "Wide range of payment options",
      "Booking contract management",
    ],
    desc: `You have realized your potential and want more😉.`,
  },
  {
    isPopular: true,
    name: "Pro Creator",
    pricing: "5,000",
    per: "/month",
    features: [
      "Everything in Upgrade",
      "Increased visibility and exposure",
      "Access to local and global brands",
      "Career growth opportunities",
    ],
    desc: `Boss🙌, we have all the features you would ever need!🫡.`,
  },
];

const PageSubcription: FC<PageSubcriptionProps> = ({ className = "" }) => {
  const renderPricingItem = (pricing: PricingItem, index: number) => {
    return (
      <div
        key={index}
        className={`h-full relative px-6 py-8 rounded-3xl border-2 flex flex-col overflow-hidden ${
          pricing.isPopular
            ? "border-primary-500"
            : "border-neutral-100 dark:border-neutral-700"
        }`}
      >
        {pricing.isPopular && (
          <span className="absolute z-10 px-3 py-1 text-xs tracking-widest text-white rounded-full bg-primary-500 right-3 top-3">
            POPULAR
          </span>
        )}
        <div className="mb-8">
          <h3 className="block mb-2 text-sm font-medium tracking-widest uppercase text-neutral-6000 dark:text-neutral-300">
            {pricing.name}
          </h3>
          <h2 className="flex items-center text-5xl leading-none">
            <span className="inline-flex"><TbCurrencyNaira />{pricing.pricing}</span>
            <span className="ml-1 text-lg font-normal text-neutral-500">
              {pricing.per}
            </span>
          </h2>
        </div>
        <nav className="mb-8 space-y-4">
          {pricing.features.map((item, index) => (
            <li className="flex items-center" key={index}>
              <span className="inline-flex flex-shrink-0 mr-4 text-primary-6000">
                <CheckIcon className="w-5 h-5" aria-hidden="true" />
              </span>
              <span className="text-neutral-700 dark:text-neutral-300">
                {item}
              </span>
            </li>
          ))}
        </nav>
        <div className="flex flex-col mt-auto">
          {pricing.isPopular ? (
            <ButtonPrimary href="/create-profile">Sign Up</ButtonPrimary>
          ) : (
            <ButtonSecondary href="/create-profile">
              <span className="font-medium">Sign Up</span>
            </ButtonSecondary>
          )}
          <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
            {pricing.desc}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-PageSubcription container pb-24 lg:pb-32 ${className}`}
      data-nc-id="PageSubcription"
    >
      <Helmet>
        <title>Pricing | GetCollabo</title>
      </Helmet>
      <header className="max-w-2xl mx-auto my-20 text-center">
        <h2 className="flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Creator Subscription
        </h2>
        <span className="block mt-2 text-sm text-neutral-700 sm:text-base dark:text-neutral-200">
          Pricing to fit the needs of any creator
        </span>
      </header>
      <section className="overflow-hidden text-sm text-neutral-600 md:text-base">
        <div className="grid gap-5 lg:grid-cols-3 xl:gap-8">
          {pricingList.map(renderPricingItem)}
        </div>
      </section>
    </div>
  );
};

export default PageSubcription;
