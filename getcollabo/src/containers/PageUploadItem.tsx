import React, { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";
import { Helmet } from "react-helmet";
import FormItem from "components/FormItem";
import MySwitch from "components/MySwitch";
import ButtonSecondary from "shared/Button/ButtonSecondary";

export interface PageUploadItemProps {
  className?: string;
}

const PageUploadItem: FC<PageUploadItemProps> = ({ className = "" }) => {

  return (
    <div
      className={`nc-PageUploadItem ${className}`}
      data-nc-id="PageUploadItem"
    >
      <Helmet>
        <title>Create Influencer Account|| GetCollabo</title>
      </Helmet>
      <div className="container">
        <div className="max-w-4xl mx-auto my-12 space-y-8 sm:lg:my-16 lg:my-24 sm:space-y-10">
          {/* HEADING */}
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Create Influencer Account
            </h2>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              You can set preferred display name, username, deliverables and
              manage other personal settings.
            </span>
          </div>
          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
          <div className="mt-10 space-y-5 md:mt-0 sm:space-y-6 md:sm:space-y-8">
            <div>
              <h3 className="text-lg font-semibold sm:text-2xl">
                Upload Profile Image or Video
              </h3>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                File types supported: JPG, PNG, GIF, MP4. - Max size: 10 MB
              </span>
              <div className="mt-5 ">
                <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-dashed border-neutral-300 dark:border-neutral-6000 rounded-xl">
                  <div className="space-y-1 text-center">
                    <svg
                      className="w-12 h-12 mx-auto text-neutral-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                      <label
                        htmlFor="file-upload"
                        className="relative font-medium rounded-md cursor-pointer text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ---- */}
            <FormItem label="Display Name">
              <Input placeholder="Enter your display name" />
            </FormItem>

            {/* ---- */}
            <FormItem label="Username">
              <Input placeholder="Enter your social media username" />
            </FormItem>

            {/* ---- */}
            <FormItem
              label="About/Info"
              desc={
                <div>
                  Write a bit about yourself here.{" "}
                  <span className="text-green-500">Be original</span>.
                </div>
              }
            >
              <Textarea rows={6} className="mt-1.5" placeholder="..." />
            </FormItem>

            {/* ---- */}
            <FormItem label="Industry">
              <Input placeholder="Enter your industry" />
            </FormItem>

            {/* ---- */}
            <FormItem
              label="TikTok username"
              desc=""
            >
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                  https://tiktok.com/
                </span>
                <Input className="!rounded-l-none" placeholder="username" />
              </div>
            </FormItem>

            {/* ---- */}
            <FormItem
              label="Instagram username"
              desc=""
            >
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                  https://instagram.com/
                </span>
                <Input className="!rounded-l-none" placeholder="username" />
              </div>
            </FormItem>

            {/* ---- */}
            <FormItem
              label="Twitter username"
              desc=""
            >
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                  https://twitter.com/
                </span>
                <Input className="!rounded-l-none" placeholder="username" />
              </div>
            </FormItem>

            {/* ---- */}
            <FormItem
              label="Snapchat username"
              desc=""
            >
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                  https://snapchat.com/
                </span>
                <Input className="!rounded-l-none" placeholder="username" />
              </div>
            </FormItem>

            {/* ---- */}
            <FormItem
              label="YouTube username"
              desc=""
            >
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                  https://youtube.com/
                </span>
                <Input className="!rounded-l-none" placeholder="username" />
              </div>
            </FormItem>

            {/* ---- */}
            <FormItem
              label="Facebook username"
              desc=""
            >
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                  https://facebook.com/
                </span>
                <Input className="!rounded-l-none" placeholder="username" />
              </div>
            </FormItem>

            {/* ---- */}
            <FormItem
              label="LinkedIn username"
              desc=""
            >
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                  https://linkedin.com/in/
                </span>
                <Input className="!rounded-l-none" placeholder="username" />
              </div>
            </FormItem>

            <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>

            {/* ---- */}
            <FormItem label="Booking start rate">
              <Input placeholder="5,000 NGN" />
            </FormItem>

            {/* ---- */}
            <MySwitch
              label="Fixed start rate"
              desc="You want to have a fixed price as your start rate (non-negotiable)"
            />

            {/* ---- */}
            <MySwitch
              enabled
              label="Instant notification"
              desc="You would receive an instant notification via email once a brand books you"
            />

            {/* ---- */}
            <div className="flex flex-col pt-2 space-x-0 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 ">
              <ButtonPrimary className="flex-1">Create account</ButtonPrimary>
              <ButtonSecondary className="flex-1">Edit profile</ButtonSecondary>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageUploadItem;
