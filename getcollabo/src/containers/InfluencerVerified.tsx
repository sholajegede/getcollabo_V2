import React, { FC, useContext } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Helmet } from "react-helmet";
import { GoVerified } from "react-icons/go";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import Page404 from "./Page404/Page404";
import { Link } from "react-router-dom";

export interface InfluencerVerifiedProps {
  className?: string;
}

const InfluencerVerified: FC<InfluencerVerifiedProps> = ({ className = "" }) => {

  const { influencer } = useContext(InfluencerAuthContext);

  return (
    <div>
      {influencer ? (
        <div className={`nc-InfluencerVerified ${className}`} data-nc-id="InfluencerVerified">
          <Helmet>
            <title>Creator Verified | GetCollabo</title>
          </Helmet>
          <div className="container">
            <div className="max-w-3xl mx-auto my-12 space-y-10 sm:lg:my-16 lg:my-24 sm:space-y-10">
              <div className="mt-28 md:mt-32 lg:mt-40 xl:mt-40 sm:mt-32">
                <div className="">
                  <div className="w-full max-w-lg px-6 pt-10 mx-auto border-2 shadow-xl pb-9 rounded-2xl">
                    <div className="flex flex-col w-full max-w-md mx-auto space-y-16">
                      <div className="flex flex-col items-center justify-center space-y-2 text-center">
                        <div className="text-3xl font-semibold">
                          <p>Profile Verified!</p>
                        </div>
                        <div className="items-center justify-center">
                          <GoVerified className="mt-8 w-[60px] h-[60px] fill-green-500"/>
                        </div>
                      </div>
                      <Link to={`/build-profile/${influencer._id}`}>
                        <ButtonPrimary>
                          Build profile
                        </ButtonPrimary> 
                      </Link>
                      

                      {/* ==== */}
                      <span className="block text-center xl:text-center md:text-center text-neutral-700 dark:text-neutral-300">
                        Skip? {` `}
                        <Link className="text-green-600" to="/dashboard">
                          Go to dashboard
                        </Link>
                      </span>            
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Page404 />
      )}
    </div>
  );
};

export default InfluencerVerified;