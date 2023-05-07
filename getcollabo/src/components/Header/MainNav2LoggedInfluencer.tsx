// @ts-nocheck
import React, { FC, useState, useEffect } from "react";
import Logo from "shared/Logo/Logo";
import MenuBarInfluencer from "shared/MenuBar/MenuBarInfluencer";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import AvatarDropdownInfluencer from "./AvatarDropdownInfluencer";
import NotifyDropdownInfluencer from "./NotifyDropdownInfluencer";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Navigation from "shared/Navigation/Navigation";
import { Link } from "react-router-dom";
import { InfluencerProfileData } from "routers/types";
import newRequest from "utils/newRequest";

export interface MainNav2LoggedInfluencerProps {
  secondInfluencerProp?: string;
}

const MainNav2LoggedInfluencer: FC<MainNav2LoggedInfluencerProps> = ({secondInfluencerProp}) => {
  const influencer = secondInfluencerProp;
  const [influencerProfile, setInfluencerProfile] = useState<InfluencerProfileData | {}>({});

  useEffect(() => {
    const fetchBrandProfile = async () => {
      const response = await newRequest.get(`/influencer/find/${influencer?._id}`);
      setInfluencerProfile(response.data);
    };
    fetchBrandProfile();
  }, [influencer]);

  return (
    <div className={`nc-MainNav2Logged relative z-10 ${"onTop "}`}>
      <div className="container relative flex items-center justify-between py-5 space-x-4 xl:space-x-8">
        <div className="flex items-center justify-start flex-grow space-x-3 sm:space-x-8 lg:space-x-10">
          <Logo />
        </div>
        <div className="flex items-center justify-end flex-shrink-0 space-x-1 text-neutral-700 dark:text-neutral-100">
          <div className="items-center hidden space-x-2 xl:flex">
            <Navigation />
            <div className="hidden h-6 border-l sm:block border-neutral-300 dark:border-neutral-6000"></div>
            <div className="flex">
              <SwitchDarkMode />
              <NotifyDropdownInfluencer />
            </div>
            <div>
          </div>
          <Link to={`/dashboard`}>
            <ButtonPrimary sizeClass="px-4 py-2 sm:px-5">Dashboard</ButtonPrimary>
          </Link>
          <div>
          </div>
          <AvatarDropdownInfluencer influencerDataProp={secondInfluencerProp}/>
          </div>
          <div className="flex items-center space-x-3 xl:hidden">
            <NotifyDropdownInfluencer />
            <AvatarDropdownInfluencer influencerDataProp={secondInfluencerProp}/>
            <MenuBarInfluencer influencerDataProp={secondInfluencerProp} />
          </div>
        </div>
      </div>
      {/* ====================== START REGISTRATION BANNER ====================== */}
      {!influencerProfile.displayName || !influencerProfile.username || !influencerProfile.industry || !influencerProfile.img || !influencerProfile.about || influencerProfile.termsAndConditionsAccepted === null ? (
        <div className="container">
          <div className="px-4 py-2 text-xs text-white bg-yellow-500 rounded animate-pulse">
            <p>Please <Link to={`/build-profile/${influencerProfile._id}`} className="font-semibold underline text-neutral-800">complete building your profile</Link> to enjoy all features.</p>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* ====================== END REGISTRATION BANNER ====================== */}
    </div>
  );
};

export default MainNav2LoggedInfluencer;