import React, { FC } from "react";
import { RiFacebookFill, RiTwitterFill, RiLinkedinFill } from "react-icons/ri";

export interface SocialsListTermsProps {
  className?: string;
  itemClass?: string;
}

const SocialsListTerms: FC<SocialsListTermsProps> = ({
  className = "",
  itemClass = "block w-6 h-6 currentColor",
}) => {
  return (
    <nav
      className={`nc-SocialsListTerms flex space-x-2.5 text-2xl text-neutral-6000 dark:text-neutral-300 ${className}`}
      data-nc-id="SocialsListTerms"
    >
      <a
        className={`${itemClass}`}
        href="https://www.facebook.com/sharer/sharer.php?u=https%3A//getcollabo.io/search"
        target="_blank"
        rel="noopener noreferrer"
        title="Share via Facebook"
      >
        <RiFacebookFill size={22} />
      </a>

      <a
        className={`${itemClass}`}
        href="https://twitter.com/intent/tweet?text=I%20just%20found%20the%20best%20to%20book%20content%20creators:%20%F0%9F%A4%A9%0Ahttps%3A//getcollabo.io/search%0A%0AAwesome%20work%20%40getcollabo!%20%0A%0AThis%20is%20awesome%20for%20sure!%0A%0A%20%23getcollabo%20%23book%20%23contentcreators%20"
        target="_blank" 
        rel="noopener noreferrer"
        title="Share via Twitter"
      >
        <RiTwitterFill size={22} />
      </a>

      <a
        className={`${itemClass}`}
        href="http://www.linkedin.com/shareArticle?url=https%3A%2F%2Fgetcollabo.io/search%2F&amp;title=500%2B%20Best%20way%20to%20book%20Content%20Creators"
        target="_blank"
        rel="noopener noreferrer"
        title="Share via LinkedIn"
      >
        <RiLinkedinFill size={22} />
      </a>
    </nav>
  );
};

export default SocialsListTerms;
