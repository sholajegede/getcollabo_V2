import ButtonPrimary from "shared/Button/ButtonPrimary";
import React from "react";
import { Helmet } from "react-helmet";
import NcImage from "shared/NcImage/NcImage";
import rightImg from "images/getcollabowide.png";

const InfluencerUpdated: React.FC = () => (
  <div className="nc-InfluencerUpdated">
    <Helmet>
      <title>Influencer Account Updated | GetCollabo</title>
    </Helmet>
    <div className="container relative pt-5 pb-16 mt-20 lg:pb-20 lg:pt-5">
      {/* HEADER */}
      <header className="max-w-2xl mx-auto space-y-4 text-center">
        <NcImage src={rightImg} />
        <span className="block text-sm font-medium tracking-wider text-neutral-800 sm:text-base dark:text-neutral-200">
          YOUR INFLUENCER PROFILE HAS BEEN UPDATED.{" "}
        </span>
        <div className="pt-8">
          <ButtonPrimary href="/dashboard">Return To Dashboard</ButtonPrimary>
        </div>
      </header>
    </div>
  </div>
);

export default InfluencerUpdated;
