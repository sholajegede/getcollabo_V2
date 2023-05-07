import React from "react";

const TimeCountDown = () => {

  return (
    <div className="space-y-5">
      <div className="flex items-center space-x-2 text-neutral-500 dark:text-neutral-400 ">
        <span className="mt-1 leading-none">Audience count</span>
      </div>
      <div className="flex space-x-5 sm:space-x-10">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-semibold sm:text-3xl">
            4.5M
          </span>
          <span className="sm:text-lg text-neutral-500 dark:text-neutral-400">
            TikTok
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-semibold sm:text-3xl">
            305k
          </span>
          <span className="sm:text-lg text-neutral-500 dark:text-neutral-400">
            Instagram
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-semibold sm:text-3xl">
            5k
          </span>
          <span className="sm:text-lg text-neutral-500 dark:text-neutral-400">
            Facebook
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-semibold sm:text-3xl">
            52.5k
          </span>
          <span className="sm:text-lg text-neutral-500 dark:text-neutral-400">
            Twitter
          </span>
        </div>
      </div>
    </div>
  );
};

export default TimeCountDown;
