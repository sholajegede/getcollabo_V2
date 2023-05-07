import React, { FC } from "react";
import SectionFounder from "./SectionFounder";
import { Helmet } from "react-helmet";
import rightImg from "images/getcollabowide.png";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionHero from "./SectionHero";
import SectionStatistic from "containers/PageAbout/SectionStatistic";

export interface PageAboutProps {
  className?: string;
}

const PageAbout: FC<PageAboutProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-PageAbout overflow-hidden relative ${className}`}
      data-nc-id="PageAbout"
    >
      <Helmet>
        <title>About | GetCollabo</title>
      </Helmet>

      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="container py-16 space-y-16 lg:py-28 lg:space-y-28">
        <SectionHero
          rightImg={rightImg}
          heading="👋 About Us"
          btnText=""
          subHeading="GetCollabo is the easiest way to collaborate with content creators and influencers securely and globally. We are making influencer collaborations accessible to businesses and brands of all sizes."
        />

        <div className="relative py-20 lg:py-24">
          <SectionFounder />
        </div>

        <div className="relative py-20 lg:py-24">
          <SectionStatistic />
        </div>

        <div className="relative py-20 lg:py-24">
          <SectionSubscribe2 />
        </div>
      </div>
    </div>
  );
};

export default PageAbout;
