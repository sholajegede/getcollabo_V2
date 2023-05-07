import { ComponentType } from "react";


export interface LocationStates {
  //Navigation
  "/"?: {};
  "/#"?: {};
  "/about"?: {};
  "/contact"?: {};
  "/pricing"?: {};

  "/terms"?: {};
  "/privacy"?: {};
  "/faqs"?: {};

  //Blog
  "/blog"?: {};
  "/blog-single"?: {};

  //404
  "/page404"?: {};

  //Tests
  "/test"?: {};

  //Auth
  "/signup"?: {};
  "/login"?: {};

  //Messages
  "/messages"?: {};
  "/messages/:username"?: {};
  "/chat"?: {};
  "/chat/:chatId"?: {};


  //-----------------------------------------------------------------//

  //Brand
  "/create-brand"?: {};
  "/complete-registration"?: {};
  "/verifyBrand"?: {};
  "/brand-verified"?: {};

  //
  "/login-brand"?: {};
  "/brand"?: {};
  "/update"?: {};
  "/update/:id"?: {};
  "/brand-updated"?: {};
  "/search"?: {};
  "/book"?: {};
  "/book/:username"?: {};
  "/booking"?: {};
  "/booking/:username"?: {};

  //
  "/chat/:username"?: {};
  "/newMessage/:username"?: {};

  //
  "/order"?: {};
  "/order/:username/:deliverableId"?: {};
  "/custom-booking/:username"?: {};
  "/confirmed"?: {};

  //
  "/forgot-password-brand"?: {};
  "/verifyBrandOTP"?: {};
  "/verifyBrandOTP/:email"?: {};
  "/reset-password-brand"?: {};
  "/reset-successful"?: {};
  


  //-----------------------------------------------------------------//

  //Influencer
  "/create-profile"?: {};
  "/build-profile/:id"?: {};
  "/verifyCreator"?: {};
  "/creator-verified"?: {};

  //
  "/login-creator"?: {}; 
  "/dashboard"?: {};
  "/submitDeliverable/:username/:indexId"?: {};
  "/edit-bank"?: {};
  "/edit-bank/:id"?: {};
  "/edit-profile"?: {};
  "/edit-profile/:id"?: {};
  "/deliverables/:id"?: {};
  "/myprofile"?: {};
  "/myprofile/:username"?: {};
  "/profile-updated"?: {};

  //
  "/chat/:businessName"?: {};

  //
  "/forgot-password-creator"?: {};
  "/verifyCreatorOTP"?: {};
  "/verifyCreatorOTP/:email"?: {};
  "/reset-password-creator"?: {};
  "/creator-reset-successful"?: {};
}

export type PathName = keyof LocationStates;

export interface Page {
  path: PathName;
  exact?: boolean;
  component: ComponentType<Object>;
}

export interface Deliverable {
  rate: number;
}

export type InfluencerType = {
  rate: number;
  deliverable: Deliverable[];
  influencerId: number;
  _id: number;
  displayName: string;
  username: string;
  industry: string;
  platforms: [string];
  bookingStartRate: number;
  location: string;
  img: string;
  about: string;
  deliverables: [string];
  featured: boolean;
  count: number;
  verified: boolean;
  followers: number;
  audienceCount: [string, number];
  rating: number;
  platform: string;
  instagram: number;
  facebook: number;
  tiktok: number;
  twitter: number;
  price: number;
}

export interface LocationState {
  industry: string;
  industryInputValue: string;
  priceInputValue: number;
  split: string;
  influencer: string;
  username: string;
}

export interface InfluencerData {
  socialLinks: [];
  email: string;
  rate: number;
  deliveryTime: string;
  description: string;
  theinfluencer: string;
  deliverable: string;
  audience: string;
  influencerId: number;
  _id: number;
  img: string;
  displayName: string;
  username: string;
  industry: string;
  platforms: [string];
  bookingStartRate: number;
  location: string;
  photos: [];
  about: string;
  deliverables: [string];
  featured: boolean;
  count: number;
  verified: boolean;
  followers: number;
  audienceCount: [string, number];
  rating: number;
  platform: string;
  instagram: number;
  facebook: number;
  tiktok: number;
  twitter: number;
  price: number;
}

export interface BrandData {
  facebook: string;
  twitter: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  logo: string;
  businessName: string;
  email: string;
  phone: number;
  desc: string;
}

export interface InfluencerProfileData {
  audience: string;
  influencerId: number;
  _id: number;
  img: string;
  displayName: string;
  username: string;
  industry: string;
  platforms: [string];
  bookingStartRate: number;
  location: string;
  photos: [];
  about: string;
  deliverables: [string];
  featured: boolean;
  count: number;
  verified: boolean;
  followers: number;
  audienceCount: [string, number];
  rating: number;
  platform: string;
  instagram: number;
  facebook: number;
  tiktok: number;
  twitter: number;
  price: number;
};

export interface BrandProfileData {
  facebook: string;
  twitter: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  logo: string;
  businessName: string;
  email: string;
  phone: number;
  desc: string;
}

