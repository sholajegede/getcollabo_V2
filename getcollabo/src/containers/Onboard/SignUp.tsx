// @ts-nocheck
import React, { FC, useState } from "react";
import { CheckIcon } from "@heroicons/react/solid";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export interface SignUpProps {
  className?: string;
}

export interface UserItem {
  name: string;
  features: string[];
  href: string;
}

const creator: UserItem[] = [
  {
    name: "Creator Profile",
    linkName: "Creator",
    href: "/create-profile",
    features: [
      "Local and global exposure",
      "Increased visibility",
      "Consistent bookings",
      "Collaborative opportunities",
      "Personalized profile",
      "Timely payments",
      "Dedicated support",
    ],
  },
];

const brand: UserItem[] = [
  {
    name: "Brand Account",
    linkName: "Brand",
    href: "/create-brand",
    features: [
      "Find verified creators/influencers easily",
      "Search within your budget",
      "Chat with creators seamlessly",
      "High-quality deliverables",
      "Fast and secure booking",
      "Manage all your collaborations in one place",
      "Dedicated support",
    ],
  },
];

const SignUp: FC<SignUpProps> = ({ className = "" }) => {
  const [selectedUser, setSelectedUser] = useState("creator");

  const handleUserSelection = (userType: string) => {
    setSelectedUser(userType);
  };

  const renderCreatorSignUp = (creator: UserItem, index: number) => {
    return (
      <div
        key={index}
        className={`h-full relative px-6 py-4 rounded-3xl border-2 flex flex-col overflow-hidden ${
          creator.name
            ? "border-primary-500"
            : "border-neutral-100 dark:border-neutral-700"
        }`}
      >
        <div className="mb-8">
          <h2 className="block mb-2 text-lg font-medium tracking-widest uppercase text-neutral-6000 dark:text-neutral-300">
            {creator.name}
          </h2>
        </div>
        <nav className="mb-8 space-y-4">
          {creator.features.map((item, index) => (
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
          <ButtonPrimary href={creator.href}>
            <span className="font-medium">Create profile</span>
          </ButtonPrimary>
        </div>
      </div>
    );
  };

  const renderBrandSignUp = (brand: UserItem, index: number) => {
    return (
      <div
        key={index}
        className={`h-full relative px-6 py-4 rounded-3xl border-2 flex flex-col overflow-hidden ${
          brand.name
            ? "border-primary-500"
            : "border-neutral-100 dark:border-neutral-700"
        }`}
      >
        <div className="mb-8">
          <h2 className="block mb-2 text-lg font-medium tracking-widest uppercase text-neutral-6000 dark:text-neutral-300">
            {brand.name}
          </h2>
        </div>
        <nav className="mb-8 space-y-4">
          {brand.features.map((item, index) => (
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
          <ButtonPrimary href={brand.href}>
            <span className="font-medium">Brand signup</span>
          </ButtonPrimary>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-SignUp container pb-24 lg:pb-32 ${className}`}
      data-nc-id="SignUp"
    >
      <Helmet>
        <title>Signup | GetCollabo</title>
      </Helmet>
      <header className="max-w-2xl mx-auto my-16 text-center">
        <h2 className="flex items-center text-3xl leading-[115%] md:text-4xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          SignUp
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
        <div className="grid w-full grid-cols-1 gap-8 mt-12 xl:max-w-xl">
          {selectedUser === "creator"
            ? creator.map((item, index) => renderCreatorSignUp(item, index))
            : brand.map((item, index) => renderBrandSignUp(item, index))}
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <span className="block text-center xl:text-end md:text-end text-neutral-700 dark:text-neutral-300">
          Already have an account? {` `}
          <Link
            className="text-green-600 underline hover:no-underline"
            to="/login"
          >
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignUp;