// @ts-nocheck
import React, { FC, useEffect, useId, useRef } from "react";
import Heading from "components/Heading/Heading";
import Glide from "@glidejs/glide";
import CardNFTVideo from "./CardNFTVideo";
import { Link } from "react-router-dom";

export interface SectionSliderCardNftVideoProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  subHeading?: string;
}

const SectionSliderCardNftVideo: FC<SectionSliderCardNftVideoProps> = ({
  className = "",
  itemClassName = "",
}) => {
  const sliderRef = useRef(null);
  const id = useId();
  const UNIQUE_CLASS = "glidejs" + id.replace(/:/g, "_");

  useEffect(() => {
    if (!sliderRef.current) {
      return;
    }

    const OPTIONS: Glide.Options = {
      perView: 3,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          gap: 28,
          perView: 2.5,
        },
        1024: {
          gap: 20,
          perView: 2.3,
        },
        768: {
          gap: 20,
          perView: 1.5,
        },
        500: {
          gap: 20,
          perView: 1,
        },
      },
    };

    let slider = new Glide(`.${UNIQUE_CLASS}`, OPTIONS);
    slider.mount();
    // @ts-ignore
    return () => slider.destroy();
  }, [sliderRef, UNIQUE_CLASS]);

  return (
    <div className={`nc-SectionSliderCardNftVideo ${className}`}>
      <div className={`${UNIQUE_CLASS} flow-root`} ref={sliderRef}>
        <Heading desc="Check out the top video promotions by the creators and influencers on our platform." hasNextPrev>
          Popular Promotions
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {[
              "https://images.unsplash.com/photo-1643101809204-6fb869816dbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
              "https://images.unsplash.com/photo-1643101808200-0d159c1331f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
              "https://images.unsplash.com/photo-1643101808513-0552e31e4d9c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
              "https://images.unsplash.com/photo-1638913974023-cef988e81629?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            ].map((item, index) => (
              <li key={index} className={`glide__slide ${itemClassName}`}>
                <CardNFTVideo featuredImage={item} />
              </li>
            ))}
            <li className={`glide__slide  ${itemClassName}`}>
              <Link to={"/page-search"} className="relative block group">
                <div className="flex w-full h-0 aspect-w-16 aspect-h-9 rounded-3xl bg-neutral-100 dark:bg-neutral-800"></div>
                <div className="absolute flex flex-col items-center justify-center inset-y-6 inset-x-10">
                  <div className="relative flex items-center justify-center">
                    <span className="text-xl font-semibold">NFTs Video</span>
                  </div>
                  <span className="mt-1 text-sm">Show me more</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SectionSliderCardNftVideo;
