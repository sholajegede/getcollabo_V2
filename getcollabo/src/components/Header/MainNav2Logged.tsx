// @ts-nocheck
import React, { FC, useState, useEffect } from "react";
import Logo from "shared/Logo/Logo";
import MenuBar from "shared/MenuBar/MenuBar";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import NotifyDropdown from "./NotifyDropdown";
import AvatarDropdown from "./AvatarDropdown";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Navigation from "shared/Navigation/Navigation";
import { Link } from "react-router-dom";
import { BrandProfileData } from "routers/types";
import newRequest from "utils/newRequest";

export interface MainNav2LoggedProps {
  secondProp?: string;
}

const MainNav2Logged: FC<MainNav2LoggedProps> = ({secondProp}) => {
  const brand = secondProp;
  const [brandProfile, setBrandProfile] = useState<BrandProfileData | {}>({});

  useEffect(() => {
    const fetchBrandProfile = async () => {
      const response = await newRequest.get(`/brand/${brand?._id}`);
      setBrandProfile(response.data);
    };
    fetchBrandProfile();
  }, [brand]);

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
              <NotifyDropdown />
            </div>
            <div>
          </div>
          <Link to={`/search`}>
            <ButtonPrimary sizeClass="px-4 py-2 sm:px-5">Start search</ButtonPrimary>
          </Link>
          <div>
          </div>
          <AvatarDropdown dataProp={secondProp}/>
          </div>
          <div className="flex items-center space-x-3 xl:hidden">
            <NotifyDropdown />
            <AvatarDropdown dataProp={secondProp}/>
            <MenuBar dataProp={secondProp} />
          </div>
        </div>
      </div>
      {/* ====================== START REGISTRATION BANNER ====================== */}
      {!brandProfile.businessName || !brandProfile.industry || !brandProfile.logo || !brandProfile.desc || brandProfile.termsAndConditionsAccepted === null ? (
        <div className="container">
          <div className="px-4 py-2 text-xs text-white bg-yellow-500 rounded animate-pulse">
            <p>Please <Link to="/complete-registration" className="font-semibold underline text-neutral-800">complete your registration</Link> to get full access.</p>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* ====================== END REGISTRATION BANNER ====================== */}
    </div>
  );
};

export default MainNav2Logged;