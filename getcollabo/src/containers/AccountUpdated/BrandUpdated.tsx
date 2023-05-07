import ButtonPrimary from "shared/Button/ButtonPrimary";
import React from "react";
import { Helmet } from "react-helmet";
import NcImage from "shared/NcImage/NcImage";
import rightImg from "images/getcollabowide.png";

const BrandUpdated: React.FC = () => (
  <div className="nc-BrandUpdated">
    <Helmet>
      <title>Brand Account Updated | GetCollabo</title>
    </Helmet>
    <div className="container relative pt-5 pb-16 mt-20 lg:pb-20 lg:pt-5">
      {/* HEADER */}
      <header className="max-w-2xl mx-auto space-y-4 text-center">
        <NcImage src={rightImg}/>
        <span className="block text-sm font-medium tracking-wider text-neutral-800 sm:text-base dark:text-neutral-200">
          YOUR BRAND ACCOUNT HAD BEEN UPDATED.{" "}
        </span>
        <div className="pt-8">
          <ButtonPrimary href="/brand">Return To Brand Page</ButtonPrimary>
        </div>
      </header>
    </div>
  </div>
);

export default BrandUpdated;
