// @ts-nocheck
import Label from "components/Label/Label";
import React, { FC, useState, useContext } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";
import { Helmet } from "react-helmet";
import { AuthContext } from "context/AuthContext";
import axios from "axios";
import { useHistory } from "react-router-dom";

export interface UpdateBrandAccountProps {
  className?: string;
}

const UpdateBrandAccount: FC<UpdateBrandAccountProps> = ({ className = "" }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({
    businessName:undefined,
    email:undefined,
    industry:undefined,
    description:undefined,
    website:undefined,
    facebook:undefined,
    twitter:undefined,
    instagram:undefined,
  });

  const { brand } = useContext(AuthContext);

  const history = useHistory();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  };


  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset","upload")
    try {
      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/getcollabo/image/upload", data);
      const {url} = uploadRes.data;

      const updateBrand = {
        ...info,
        img:url,
      };

      await axios.put(`https://getcollabo.herokuapp.com/app/brands/${brand._id}`, updateBrand);
      history.push("/brand");
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
      <Helmet>
        <title>Create Brand Account || GetCollabo</title>
      </Helmet>
      <div className="container">
        <div className="max-w-4xl mx-auto my-12 space-y-8 sm:lg:my-16 lg:my-24 sm:space-y-10">
          {/* HEADING */}
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Complete Profile
            </h2>
            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              Fill in your business or brand information to get started on Getcollabo.
            </span>
          </div>
          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
          <form>
            <div className="flex flex-col md:flex-row">
              <div className="flex items-start flex-shrink-0">
                <div className="relative flex w-32 h-32 overflow-hidden rounded-full">
                  <img
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                    alt=""
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black cursor-pointer bg-opacity-60 text-neutral-50">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="mt-1 text-xs">Change Image</span>
                  </div>
                  <input
                    type="file"
                    id="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
              </div>
              <div className="flex-grow max-w-3xl mt-10 space-y-5 md:mt-0 md:pl-16 sm:space-y-6 md:sm:space-y-7">
                {/* ---- */}
                <div>
                  <Label>Brand/Business Name</Label>
                  <Input id="businessName" className="mt-1.5" placeholder={brand.businessName} onChange={handleChange}/>
                </div>

                {/* ---- */}
                <div>
                  <Label>Business Email</Label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                      <i className="text-2xl las la-envelope"></i>
                    </span>
                    <Input
                      id="email"
                      className="!rounded-l-none"
                      placeholder="example@email.com"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* ---- */}
                <div>
                  <Label>Description</Label>
                  <Textarea
                    id="description"
                    rows={5}
                    className="mt-1.5"
                    placeholder="What does your business do?"
                    onChange={handleChange}
                  />
                </div>

                {/* ---- */}
                <div>
                  <Label>Industry</Label>
                  <Input id="industry" className="mt-1.5" placeholder="What industry does your business operate in?" onChange={handleChange}/>
                </div>

                {/* ---- */}
                <div className="">
                  <Label>Website</Label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-3 text-sm border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                      https://
                    </span>
                    <Input
                      id="website"
                      className="!rounded-l-none"
                      placeholder="yourwebsite.com"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* ---- */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-2.5">
                  <div>
                    <Label>Facebook</Label>
                    <div className="mt-1.5 flex">
                      <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                        <i className="text-2xl lab la-facebook-f"></i>
                      </span>
                      <Input
                        id="facebook"
                        className="!rounded-l-none"
                        placeholder="yourfacebook"
                        sizeClass="h-11 px-4 pl-2 pr-3"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Twitter</Label>
                    <div className="mt-1.5 flex">
                      <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                        <i className="text-2xl lab la-twitter"></i>
                      </span>
                      <Input
                        id="twitter"
                        className="!rounded-l-none"
                        placeholder="yourtwitter"
                        sizeClass="h-11 px-4 pl-2 pr-3"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Instagram</Label>
                    <div className="mt-1.5 flex">
                      <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                        <i className="text-2xl lab la-instagram"></i>
                      </span>
                      <Input
                        id="instagram"
                        className="!rounded-l-none"
                        placeholder="yourinstagram"
                        sizeClass="h-11 px-4 pl-2 pr-3"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* ---- */}
                <div className="pt-2">
                  <ButtonPrimary className="w-full" onClick={handleClick}>Complete profile</ButtonPrimary>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBrandAccount;
