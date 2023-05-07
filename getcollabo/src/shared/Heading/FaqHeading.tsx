import NextPrev from "shared/NextPrev/NextPrev";
import React, { HTMLAttributes, ReactNode } from "react";

export interface FaqHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  fontClass?: string;
  desc?: ReactNode;
  hasNextPrev?: boolean;
  isCenter?: boolean;
}

const FaqHeading: React.FC<FaqHeadingProps> = ({
  children,
  desc = "",
  className = "mt-6 mb-2 text-neutral-900 dark:text-neutral-50",
  isCenter = false,
  hasNextPrev = false,
  ...args
}) => {
  return (
    <div
      className={`nc-Faq-Heading relative flex flex-col sm:flex-row sm:items-end justify-between ${className}`}
    >
      <div
        className={
          isCenter ? "text-center w-full max-w-2xl mx-auto mb-4" : "max-w-2xl"
        }
      >
        <h2 className={`text-xl md:text-xl font-semibold`} {...args}>
          {children || ``}
        </h2>
        {desc && (
          <span className="block mt-2 text-base font-normal md:mt-4 sm:text-lg text-neutral-500 dark:text-neutral-400">
            {desc}
          </span>
        )}
      </div>
      {hasNextPrev && !isCenter && (
        <div className="flex justify-end flex-shrink-0 mt-4 sm:ml-2 sm:mt-0">
          <NextPrev onClickNext={() => {}} onClickPrev={() => {}} />
        </div>
      )}
    </div>
  );
};

export default FaqHeading;
