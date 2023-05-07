import React, { FC } from "react";
import MainNav2LoggedInfluencer from "./MainNav2LoggedInfluencer";

export interface HeaderLoggedInfluencerProps {
  influencerProp?: string;
}

const HeaderLoggedInfluencer: FC<HeaderLoggedInfluencerProps> = ({influencerProp}) => {
  return (
    <div className="relative z-40 w-full nc-HeaderLogged ">
      {/* NAV */}
      <MainNav2LoggedInfluencer secondInfluencerProp={influencerProp}/>
    </div>
  );
};

export default HeaderLoggedInfluencer;
