import React, { useContext } from "react";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import Logo from "shared/Logo/Logo";
import { Disclosure } from "@headlessui/react";
import { Link, NavLink } from "react-router-dom";
import { NavItemType } from "./NavigationItem";
import { NAVIGATION_DEMO_2 } from "data/navigation";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { ChevronDownIcon } from "@heroicons/react/solid";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { RiFacebookFill, RiInstagramFill, RiTwitterFill, RiLinkedinFill } from "react-icons/ri";
import { SiTiktok } from "react-icons/si";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";

export interface NavMobileInfluencerProps {
  data?: NavItemType[];
  onClickClose?: () => void;
  secondDataProp?: string;
}

const NavMobileInfluencer: React.FC<NavMobileInfluencerProps> = ({
  data = NAVIGATION_DEMO_2,
  onClickClose,
  secondDataProp,
}) => {

  const { influencer } = useContext(InfluencerAuthContext);

  const _renderMenuChild = (item: NavItemType) => {
    return (
      <ul className="pb-1 pl-6 text-base nav-mobile-sub-menu">
        {item.children?.map((i, index) => (
          <Disclosure key={i.href + index} as="li">
            <NavLink
              exact
              strict
              to={{
                pathname: i.href || undefined,
              }}
              className="flex px-4 py-2.5 text-neutral-900 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-[2px]"
              activeClassName="text-secondary"
            >
              <span
                className={!i.children ? "block w-full" : ""}
                onClick={onClickClose}
              >
                {i.name}
              </span>
              {i.children && (
                <span
                  className="flex-grow block"
                  onClick={(e) => e.preventDefault()}
                >
                  <Disclosure.Button
                    as="span"
                    className="flex justify-end flex-grow"
                  >
                    <ChevronDownIcon
                      className="w-4 h-4 ml-2 text-neutral-500"
                      aria-hidden="true"
                    />
                  </Disclosure.Button>
                </span>
              )}
            </NavLink>
            {i.children && (
              <Disclosure.Panel>{_renderMenuChild(i)}</Disclosure.Panel>
            )}
          </Disclosure>
        ))}
      </ul>
    );
  };

  const _renderItem = (item: NavItemType, index: number) => {
    return (
      <Disclosure
        key={item.id}
        as="li"
        className="text-neutral-900 dark:text-white"
      >
        <NavLink
          exact
          strict
          className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
          to={{
            pathname: item.href || undefined,
          }}
          activeClassName="text-secondary"
        >
          <span
            className={!item.children ? "block w-full" : ""}
            onClick={onClickClose}
          >
            {item.name}
          </span>
          {item.children && (
            <span
              className="flex-grow block"
              onClick={(e) => e.preventDefault()}
            >
              <Disclosure.Button
                as="span"
                className="flex justify-end flex-grow"
              >
                <ChevronDownIcon
                  className="w-4 h-4 ml-2 text-neutral-500"
                  aria-hidden="true"
                />
              </Disclosure.Button>
            </span>
          )}
        </NavLink>
        {item.children && (
          <Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>
        )}
      </Disclosure>
    );
  };

  return (
    <div className="w-full h-screen max-w-sm py-2 overflow-y-auto transition transform bg-white divide-y-2 shadow-lg ring-1 dark:ring-neutral-700 dark:bg-neutral-900 divide-neutral-100 dark:divide-neutral-800">
      <div className="px-5 py-6">
        <Logo />
        <div className="flex flex-col mt-5 text-sm text-neutral-700 dark:text-neutral-300">
          <span>
            The easiest and secure way to collaborate with content creators and influencers.
          </span>

          <div className="flex items-center justify-between mt-4">
            <ul className="flex mt-3 space-x-4 justify-left items-left">         
              <li>
                <a href="https://www.twitter.com/getcollabo" title="Twitter" className="transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80">
                  <RiTwitterFill className="w-6 h-6 dark:fill-white fill-bg-neutral-900"/>
                </a>
              </li>

              <li>
                <a href="https://www.instagram.com/getcollabo" title="Instagram" className="transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80">
                  <RiInstagramFill className="w-6 h-6 dark:fill-white fill-bg-neutral-900"/>
                </a>
              </li>

              <li>
                <a href="https://www.linkedin.com/company/getcollabo" title="LinkedIn" className="transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80">
                  <RiLinkedinFill className="w-6 h-6 dark:fill-white fill-bg-neutral-900"/>
                </a>
              </li>
        
              <li>
                <a href="https://www.tiktok.com/@getcollabo" title="TikTok" className="transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80">
                  <SiTiktok className="w-5 h-6 dark:fill-white fill-bg-neutral-900"/>
                </a>
              </li>

              <li>
                <a href="https://www.facebook.com/getcollabo" title="Facebook" className="transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80">
                  <RiFacebookFill className="w-6 h-6 dark:fill-white fill-bg-neutral-900"/>
                </a>
              </li>
            </ul>
            <span className="block">
              <SwitchDarkMode className="bg-neutral-100 dark:bg-neutral-800" />
            </span>
          </div>
        </div>
        <span className="absolute p-1 right-2 top-2">
          <ButtonClose onClick={onClickClose} />
        </span>
      </div>
      <ul className="flex flex-col px-2 py-6 space-y-1">
        {data.map(_renderItem)}
      </ul>
      {secondDataProp ? (
        <div className="flex items-center justify-between px-5 py-6 space-x-2">
          <Link to={`/myprofile/${influencer.username}`}>
            <ButtonSecondary onClick={onClickClose} className="flex-1">
              My Profile
            </ButtonSecondary>
          </Link>
          <Link to={"/dashboard"}>
            <ButtonPrimary onClick={onClickClose} className="!px-10">
            Dashboard
          </ButtonPrimary>
          </Link>
          
        </div>
      ) : (
        <div className="flex items-center justify-between px-5 py-6 space-x-2">
          <ButtonSecondary onClick={onClickClose} href={"/login"} className="!px-10">
            Log In
          </ButtonSecondary>
          <ButtonPrimary onClick={onClickClose} href={"/signup"} className="flex-1">
            Sign Up
          </ButtonPrimary>
        </div>
      )}
    </div>
  );
};

export default NavMobileInfluencer;
