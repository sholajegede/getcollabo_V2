import React, { useContext } from "react";
import HeaderLogged from "components/Header/HeaderLogged";
import HeaderLoggedInfluencer from "components/Header/HeaderLoggedInfluencer";
import Header2 from "components/Header/Header2";
import { AuthContext } from "context/AuthContext";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";

const SiteHeader = () => {

  const { brand } = useContext(AuthContext);
  const { influencer } = useContext(InfluencerAuthContext);
  
  return (
    <div>
      {brand ? (
        <HeaderLogged firstProp={brand} />
      ) : influencer ? (
        <HeaderLoggedInfluencer influencerProp={influencer} />
      ) : (
        <Header2 />
      )}
    </div>
  );
};

export default SiteHeader;
