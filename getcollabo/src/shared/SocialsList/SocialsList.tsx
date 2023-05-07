import React, { FC } from "react";
import { BrandData } from "routers/types";
import { RiFacebookFill, RiInstagramFill, RiTwitterFill } from "react-icons/ri";

export interface SocialsListProps {
  className?: string;
  itemClass?: string;
  dataProp?: BrandData;
}

const SocialsList: FC<SocialsListProps> = ({
  className = "",
  itemClass = "block w-6 h-6 currentColor",
  dataProp,
}) => {
  return (
    <nav
      className={`nc-SocialsList flex space-x-2.5 text-2xl text-neutral-6000 dark:text-neutral-300 ${className}`}
      data-nc-id="SocialsList"
    >
      <a
        className={`${itemClass}`}
        href={`https://facebook.com/${dataProp?.facebook}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Facebook"
      >
        <RiFacebookFill />
      </a>

      <a
        className={`${itemClass}`}
        href={`https://twitter.com/${dataProp?.twitter}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Twitter"
      >
        <RiTwitterFill />
      </a>

      <a
        className={`${itemClass}`}
        href={`https://instagram.com/${dataProp?.instagram}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Instagram"
      >
        <RiInstagramFill />
      </a>
    </nav>
  );
};

export default SocialsList;
