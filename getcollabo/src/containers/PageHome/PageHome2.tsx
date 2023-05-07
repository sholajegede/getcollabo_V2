import React from "react";
import SectionSliderCategories from "components/SectionSliderCategories/SectionSliderCategories";
import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionHero2 from "components/SectionHero/SectionHero2";
import SectionGridFeatureNFT2 from "./SectionGridFeatureNFT2";

function PageHome() {
  return (
    <div className="relative overflow-hidden nc-PageHome">
      <Helmet>
        <title>GetCollabo | Find, book, and manage content creators easily and securely</title>
      </Helmet>
      {/* GLASSMORPHISM */}
      <BgGlassmorphism />

      <div className="container relative mt-6 mb-20 sm:mb-24 lg:mt-20 lg:mb-32">
        {/* SECTION HERO */}
        <SectionHero2 />

        {/* SECTION 2 */}
        <SectionHowItWork className="lg:mt-20 xl:mt-20" />
      </div>

      {/* SECTION LARGE SLIDER *}
      <div className="py-20 bg-neutral-100/70 dark:bg-black/20 lg:py-32">
        <div className="container">
          <SectionLargeSlider />
        </div>
      </div>
      */}


      <div className="container relative my-24 space-y-24 lg:space-y-32 lg:my-32">
        {/* SECTION */}
        <div className="relative py-20 lg:py-28">
          <BackgroundSection className="bg-neutral-100/70 dark:bg-black/20 " />
          <SectionGridFeatureNFT2 />
        </div>

        {/* SECTION 1 */}
        <SectionSliderCategories />

        {/* SECTION */}
        <div className="relative py-20 lg:py-24">
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div>

        {/* SECTION */}
        <SectionSubscribe2 />
      </div>
    </div>
  );
}

export default PageHome;
