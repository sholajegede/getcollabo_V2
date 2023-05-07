// @ts-nocheck
import { SocialType } from "shared/SocialsShare/SocialsShare";
import React, { FC } from "react";
import { RiFacebookFill, RiInstagramFill, RiTwitterFill, RiLinkedinFill } from "react-icons/ri";
import { SiTiktok } from "react-icons/si";

export interface SocialsList1Props {
  className?: string;
}

const socials: SocialType[] = [
  { name: "Twitter", icon: <RiTwitterFill />, href: "https://www.twitter.com/getcollabo" },
  { name: "Instagram", icon: <RiInstagramFill />, href: "https://www.instagram.com/getcollabo" },
  { name: "TikTok", icon: <SiTiktok className="w-5 h-4" />, href: "https://www.tiktok.com/@getcollabo" },
  { name: "LinkedIn", icon: <RiLinkedinFill />, href: "https://www.linkedin.com/company/getcollabo" },
  { name: "Facebook", icon: <RiFacebookFill />, href: "https://www.facebook.com/getcollabo" },
];

const SocialsList1: FC<SocialsList1Props> = ({ className = "space-y-3" }) => {
  const renderItem = (item: SocialType, index: number) => {
    return (
      <a
        href={item.href}
        className="flex items-center space-x-3 text-2xl leading-none text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white group "
        key={index}
      >
        <div className="flex flex-shrink-0 w-5 space-x-4 justify-left items-left">
          {item.icon}
        </div>
        <span className="hidden text-sm lg:block">{item.name}</span>
      </a>
    );
  };

  return (
    <div className={`nc-SocialsList1 ${className}`} data-nc-id="SocialsList1">
      {socials.map(renderItem)}
    </div>
  );
};

export default SocialsList1;
