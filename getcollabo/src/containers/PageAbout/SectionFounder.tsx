import Heading from "components/Heading/Heading";
import React from "react";
import NcImage from "shared/NcImage/NcImage";
import shola from "images/founder2.jpg";
import daniel from "images/daniel.jpg";
import teetat from "images/teetat.jpg";
import lola from "images/lola.jpg";

export interface People {
  id: string;
  name: string;
  job: string;
  avatar: string;
}

const SectionFounder = () => {
  return (
    <div className="relative nc-SectionFounder">
      <Heading
        desc=""
      >
        ⛱ The Team
      </Heading>
      <div className="grid sm:grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4 xl:gap-x-10">
          <div className="max-w-sm">
            <NcImage
              containerClassName="relative h-0 aspect-h-1 aspect-w-1 rounded-xl overflow-hidden"
              className="absolute inset-0 object-cover"
              src={shola}
            />
            <h3 className="mt-4 text-lg font-semibold text-neutral-900 md:text-xl dark:text-neutral-200">
              OluwaniShola Jegede
            </h3>
            <span className="block text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
              Founder
            </span>
          </div>

          <div className="max-w-sm">
            <NcImage
              containerClassName="relative h-0 aspect-h-1 aspect-w-1 rounded-xl overflow-hidden"
              className="absolute inset-0 object-cover"
              src={teetat}
            />
            <h3 className="mt-4 text-lg font-semibold text-neutral-900 md:text-xl dark:text-neutral-200">
              Tolulope Afolayan
            </h3>
            <span className="block text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
              Operations Lead
            </span>
          </div>

          <div className="max-w-sm">
            <NcImage
              containerClassName="relative h-0 aspect-h-1 aspect-w-1 rounded-xl overflow-hidden"
              className="absolute inset-0 object-cover"
              src={lola}
            />
            <h3 className="mt-4 text-lg font-semibold text-neutral-900 md:text-xl dark:text-neutral-200">
            Damilola Olugbenga
            </h3>
            <span className="block text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
              Marketing Lead
            </span>
          </div>

          <div className="max-w-sm">
            <NcImage
              containerClassName="relative h-0 aspect-h-1 aspect-w-1 rounded-xl overflow-hidden"
              className="absolute inset-0 object-cover"
              src={daniel}
            />
            <h3 className="mt-4 text-lg font-semibold text-neutral-900 md:text-xl dark:text-neutral-200">
              Okougbegun Daniel
            </h3>
            <span className="block text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
              Brand and Graphic Design Lead
            </span>
          </div>
      </div>
    </div>
  );
};

export default SectionFounder;
