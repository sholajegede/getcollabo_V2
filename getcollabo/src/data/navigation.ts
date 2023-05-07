import { NavItemType } from "shared/Navigation/NavigationItem";
import ncNanoId from "utils/ncNanoId";

const industryChildMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/search",
    name: "Art",
  },
  {
    id: ncNanoId(),
    href: "/search",
    name: "Beauty",
  },
  {
    id: ncNanoId(),
    href: "/search",
    name: "Blockchain",
  },
  {
    id: ncNanoId(),
    href: "/search",
    name: "Business",
  },
  {
    id: ncNanoId(),
    href: "/search",
    name: "Dance",
  },
  {
    id: ncNanoId(),
    href: "/search",
    name: "Fashion",
  },
  {
    id: ncNanoId(),
    href: "/search",
    name: "Finance",
  },
  {
    id: ncNanoId(),
    href: "/search",
    name: "Food",
  },
  {
    id: ncNanoId(),
    href: "/search",
    name: "Gaming",
  },
  {
    id: ncNanoId(),
    href: "/search",
    name: "Health",
  },
  {
    id: ncNanoId(),
    href: "/search",
    name: "Lifestyle",
  },
  {
    id: ncNanoId(),
    href: "/search",
    name: "Music",
  },
  {
    id: ncNanoId(),
    href: "/search",
    name: "Photography",
  },
  {
    id: ncNanoId(),
    href: "/search",
    name: "Real Estate",
  },
  {
    id: ncNanoId(),
    href: "/search",
    name: "Skits",
  },
  {
    id: ncNanoId(),
    href: "/search",
    name: "Storytelling",
  },
  {
    id: ncNanoId(),
    href: "/search",
    name: "Sports",
  },
  {
    id: ncNanoId(),
    href: "/search",
    name: "Tech",
  },
  {
    id: ncNanoId(),
    href: "/search",
    name: "Travel",
  },
];

const exploreChildMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/about",
    name: "About Us",
  },
  {
    id: ncNanoId(),
    href: "/contact",
    name: "Support",
  },
  {
    id: ncNanoId(),
    href: "/pricing",
    name: "Pricing",
  },
  {
    id: ncNanoId(),
    href: "/faqs",
    name: "FAQs",
  },
  {
    id: ncNanoId(),
    href: "/privacy",
    name: "Privacy Policy",
  },
  {
    id: ncNanoId(),
    href: "/terms",
    name: "Terms of Service",
  },
];

export const NAVIGATION_DEMO_2: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/#",
    name: "Explore",
    type: "dropdown",
    children: exploreChildMenus,
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Available Industries",
    type: "dropdown",
    children: industryChildMenus,
  },
];
