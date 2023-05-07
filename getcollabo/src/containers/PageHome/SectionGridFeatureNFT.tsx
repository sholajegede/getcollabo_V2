import React, { FC } from "react";
import CardNFT from "components/CardNFT";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import HeaderFilterSection from "components/HeaderFilterSection";
import useFetch from "hooks/useFetch";

//
export interface SectionGridFeatureNFTProps {}

const SectionGridFeatureNFT: FC<SectionGridFeatureNFTProps> = () => {
  const { data, loading } = useFetch("/influencers?industry=");

  
  return (
    <div className="relative nc-SectionGridFeatureNFT">
      <HeaderFilterSection />
      {/**
       * <div
        className={`grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 `}
      >
        {loading ? (
        "loading"
        ) : (
          <>
            {data.map((item) => (
              <CardNFT />
            ))}
          </>
        )}
      </div>
       * 
       * 
       */}
      
      <div className="flex items-center justify-center mt-16">
        <ButtonSecondary loading>Show me more</ButtonSecondary>
      </div>
    </div>
  );
};

export default SectionGridFeatureNFT;
