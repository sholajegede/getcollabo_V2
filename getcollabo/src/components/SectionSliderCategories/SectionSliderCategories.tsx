// @ts-nocheck
import React, { FC, useEffect, useId, useRef, useState } from "react";
import Heading from "components/Heading/Heading";
import Glide from "@glidejs/glide";
import NcImage from "shared/NcImage/NcImage";
import { Link } from "react-router-dom";
import newRequest from "utils/newRequest";

export interface SectionSliderCategoriesProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  subHeading?: string;
}

const SectionSliderCategories: FC<SectionSliderCategoriesProps> = ({
  heading = "Browse by industry",
  subHeading = "Number of creators by industries.",
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
      perView: 4.5,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          gap: 28,
          perView: 3.5,
        },
        1024: {
          gap: 20,
          perView: 3.5,
        },
        768: {
          gap: 20,
          perView: 2.5,
        },
        500: {
          gap: 20,
          perView: 1.5,
        },
      },
    };

    let slider = new Glide(`.${UNIQUE_CLASS}`, OPTIONS);
    slider.mount();
    // @ts-ignore
    return () => slider.destroy();
  }, [sliderRef, UNIQUE_CLASS]);

  const [industries, setIndustries] = useState([])

  //
  useEffect(() => {
    const fetchIndustries = async () => {
      const response = await newRequest.get("/influencer/countByIndustry");
      setIndustries(response.data);
    };
    fetchIndustries();
  }, [newRequest]);
  //

  const images = [
    "https://pbs.twimg.com/media/FN43E9gXoAMhc94.jpg",
    "https://uploads-ssl.webflow.com/61005d24feea1014e5ad8d50/620c03d4301e709d9e14a425_beauty%20influencer_header.jpg",
    "https://cdn.punchng.com/wp-content/uploads/2023/02/24200926/metaverse.jpg",
    "https://www.un.org/africarenewal/sites/www.un.org.africarenewal/files/styles/ar_main_story_big_picture/public/images/AFRIPODFEST%203_MO_1849%20Africa%20Podfest%202021.jpg?itok=D4yXqkJr",
    "https://cms.afrotech.com/wp-content/uploads/2020/02/13RENEGADE3-superJumbo-v2-compress.jpg",
    "https://www.byrdie.com/thmb/SyEnpHMlTlX5FgKdoIkMzc5UgSY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/fashionbloggersprimary-2210aaad71a0454a899fa4345bef529f.jpg",
    "https://img.freepik.com/premium-photo/portrait-african-american-vlogger-holding-boom-arm-microphone-close-mouth-answering-messages-recieved-social-media-mobile-app-content-creator-sitting-front-laptop-recording-desk_482257-36758.jpg",
    "https://restaurantclicks.com/wp-content/uploads/2022/06/Popular-African-Foods.jpg",
    "https://cdn.dribbble.com/users/2966480/screenshots/11470526/nintendoswicth-dribbble_4x.png",
    "https://resources.clearvoice.com/wp-content/uploads/2018/03/03.30.18-Hero_1360x646.png",
    "https://everydayeyecandy.com/wp-content/uploads/2020/01/74976777_2841214505911883_8711666144143866600_n.jpg_nc_htscontent-iad3-1.cdninstagram.com_nc_cat111_nc_ohcghrkz1cropaax9heaz2oh28c38f00b2f483a42910b898f2befe0foe5e9d3576-735x919.jpg",
    "https://sheownsit.com/wp-content/uploads/2022/02/Private-Black-Female-Photographers-and-Content-Creators-You-Should-Work-With-in-2022.jpg",
    "https://cdn.corporatefinanceinstitute.com/assets/real-estate.jpeg",
    "https://res.cloudinary.com/newlink/image/upload/v1678811692/mvpwebsite/skits.png",
    "https://content.disha.ng/pages/ef66d688-3d5c-4d10-a9cc-dae66aaf0f7a/ossduxHLASjSoH991sYA9DtBlJNbgdqQYJSX1OHA.jpeg",
    "https://media.licdn.com/dms/image/D4D03AQFFA0e4yfYL1A/profile-displayphoto-shrink_800_800/0/1664187980224?e=2147483647&v=beta&t=T-_qgVbg8EQ0dMFLNOWQnaGjf_SOq83DDAFKCT6d-U4",
    "https://i0.wp.com/naijaknowhow.net/wp-content/uploads/2022/03/Fisayo-Fosudo.jpg?resize=639%2C586&ssl=1",
    "https://www.nomadafricamag.com/wp-content/uploads/2019/11/shutterstock_12819594340.jpg",
  ];

  return (
    <div className={`nc-SectionSliderCategories ${className}`}>
      <div className={`${UNIQUE_CLASS} flow-root`} ref={sliderRef}>
        <Heading desc={subHeading} hasNextPrev>
          {heading}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {industries &&
              images.map((img, i) => (
                <li key={i} className={`glide__slide ${itemClassName}`}>
                  <div
                    className={`flex aspect-w-16 aspect-h-10 w-full h-0 rounded-3xl overflow-hidden z-0`}
                  >
                    <NcImage
                      src={img}
                      className="object-cover w-full h-full rounded-2xl"
                    />
                    <span className="absolute inset-0 transition-opacity bg-black opacity-0 group-hover:opacity-100 bg-opacity-10"></span>
                  </div>
                  <Link to={"/search"} className="absolute inset-0"></Link>
                  <div className="flex items-center mt-4">
                    <div className="ml-3">
                      <h2
                        className={`capitalize text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate`}
                      >
                        {industries[i]?.industry}
                      </h2>
                      <span
                        className={`block mt-1 text-sm text-neutral-6000 dark:text-neutral-400`}
                      >
                        {industries[i]?.count} Creators
                      </span>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SectionSliderCategories;
