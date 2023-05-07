import Heading from "shared/Heading/Heading";
import NcImage from "shared/NcImage/NcImage";
import NcPlayIcon from "shared/NcPlayIcon/NcPlayIcon";
import React, { FC, useState } from "react";
import isSafariBrowser from "utils/isSafariBrowser";

export interface VideoType {
  id: string;
  title: string;
  thumbnail: string;
}

export interface SectionVideosProps {
  videos?: VideoType[];
  className?: string;
}

const VIDEOS_DEMO: VideoType[] = [
  {
    id: "Q1UZeJtClJY",
    title: "How To Use GetCollabo For Your Brand",
    thumbnail:
      "https://res.cloudinary.com/newlink/image/upload/v1674299335/image-getcollabo_c1qrop.png",
  },
];

const SectionVideos: FC<SectionVideosProps> = ({
  videos = VIDEOS_DEMO,
  className = "",
}) => {
  const [isPlay, setIsPlay] = useState(false);
  const [currentVideo] = useState(0);

  const renderMainVideo = () => {
    const video: VideoType = videos[currentVideo];
    return (
      <div
        className="group aspect-w-16 aspect-h-16 sm:aspect-h-9 bg-neutral-800 rounded-3xl overflow-hidden border-4 border-white dark:border-neutral-900 sm:rounded-[50px] sm:border-[10px] z-0"
        title={video.title}
      >
        {isPlay ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1${
              isSafariBrowser() ? "&mute=1" : ""
            }`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            className="rounded-3xl"
          ></iframe>
        ) : (
          <>
            <div
              onClick={() => setIsPlay(true)}
              className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
            >
              <NcPlayIcon />
            </div>
            <NcImage
              containerClassName="absolute inset-0 rounded-3xl overflow-hidden z-0"
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-100 "
              src={video.thumbnail}
              title={video.title}
              alt={video.title}
            />
          </>
        )}
      </div>
    );
  };

  return (
    <div className={`nc-SectionVideos ${className}`}>
      <Heading
        desc="Watch how easy it is to use GetCollabo to collaborate with influencers for your brand and business"
      >
        🎬 Quick Demonstration
      </Heading>

      <div className="relative flex flex-col sm:pr-4 sm:py-4 md:pr-6 md:py-6 xl:pr-14 xl:py-14 lg:flex-row">
        <div className="absolute -top-4 -bottom-4 -right-4 w-2/3 rounded-3xl bg-primary-100 z-0 sm:rounded-[50px] md:top-0 md:bottom-0 md:right-0 xl:w-7/12 dark:bg-neutral-800/80"></div>
        <div className="relative flex-grow ">{renderMainVideo()}</div>
      </div>
    </div>
  );
};

export default SectionVideos;
