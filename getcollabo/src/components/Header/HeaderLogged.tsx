import React, { FC } from "react";
import MainNav2Logged from "./MainNav2Logged";

export interface HeaderLoggedProps {
  firstProp?: string;
}

const HeaderLogged: FC<HeaderLoggedProps> = ({firstProp}) => {
  return (
    <div className="relative z-40 w-full nc-HeaderLogged ">
      {/* NAV */}
      <MainNav2Logged secondProp={firstProp}/>
    </div>
  );
};

export default HeaderLogged;
