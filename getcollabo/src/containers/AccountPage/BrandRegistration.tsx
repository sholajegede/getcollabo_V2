// @ts-nocheck
import Label from "components/Label/Label";
import React, { FC, useState, useContext, useEffect } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";
import { Helmet } from "react-helmet";
import { AuthContext } from "context/AuthContext";
import newRequest from "utils/newRequest";
import upload from "utils/upload";
import { Link, useHistory } from "react-router-dom";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import CreateAccountPage from "./CreateAccountPage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckboxTerms from "shared/Checkbox/CheckboxTerms";
import Login from "containers/Onboard/Login";

export interface BrandRegistrationProps {
  className?: string;
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
}

const BrandRegistration: FC<BrandRegistrationProps> = ({
  className = "",
  sizeClass = "h-11 px-4 py-3",
  fontClass = "text-sm font-normal",
  rounded = "rounded-2xl",
}) => {
  const [file, setFile] = useState("");
  const [credentials, setCredentials] = useState({
    businessName: undefined,
    phone: undefined,
    industry: undefined,
    desc: undefined,
    website: undefined,
    facebook: undefined,
    twitter: undefined,
    instagram: undefined,
  });
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [error, setError] = useState();

  const { influencer } = useContext(InfluencerAuthContext);

  const { brand, dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const fileSize = file.size; // in bytes
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes

    if (fileSize > maxSize) {
      setErrorMessage("File size exceeds 2MB limit.");
      event.target.value = null; // reset input value
      setFile(null);
    } else {
      setFile(file);
      setErrorMessage("");
    }
  };

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    console.log('termsAndConditions changed:', termsAndConditions);
  }, [termsAndConditions]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch({ type: "REGISTRATION_START" });
    const url = await upload(file);

    try {
      const brandRegistration = {
        ...credentials,
        logo: url,
        termsAndConditionsAccepted: termsAndConditions,
      };

      const res = await newRequest.put(`/auth-brand/register/${brand._id}`, brandRegistration);
      dispatch({ type: "REGISTRATION_SUCCESS", payload: res.data });
      setLoading(false);
      history.push("/brand");
    } catch (error) {
      dispatch({ type: "REGISTRATION_FAILURE", payload: error?.response?.data });
      setLoading(false);
      if (error.response) {
        setError(error.response.data.error);
        toast.error(error.response.data.error, {position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "colored"});
      } else {
        setError(error.message);
        toast.error(error.message, {position: "top-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "colored"});
      }
    }
  };

  return (
    <div>
      {brand ? (
        <div className={`nc-BrandRegistration ${className}`} data-nc-id="BrandRegistration">
          <Helmet>
            <title>Complete Brand Registration | GetCollabo</title>
          </Helmet>
          <div className="container">
            <div className="max-w-4xl mx-auto my-12 space-y-8 sm:lg:my-16 lg:my-24 sm:space-y-10">
              {/* HEADING */}
              <div className="max-w-2xl">
                <h2 className="text-3xl font-semibold sm:text-4xl">
                  Complete Brand Profile
                </h2>
                <span className="block mt-3 text-sm xl:text-lg lg:text-lg md:text-sm text-neutral-500 dark:text-neutral-400">
                  Fill in your business or brand information to complete your account registration.
                </span>
              </div>
              <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
              <div
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSignUp(e);
                  }
                }}
              >
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
                          alt="Uploaded logo"
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
                          <span className="mt-1 text-xs">Upload Logo</span>
                          <p className="mt-1 text-xs">Max size: 2MB</p>
                        </div>
                        <input
                          type="file"
                          id="file"
                          accept=".png,.jpg,.jpeg"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onInput={handleFileInputChange}
                        />
                      </div>
                    </div>
                    {errorMessage && <p className="mt-1 text-xs text-red-500">{errorMessage}</p>}

                    <div className="flex-grow max-w-3xl mt-10 space-y-5 md:mt-0 md:pl-16 sm:space-y-6 md:sm:space-y-7">
                      {/* ---- */}
                      <div>
                        <Label>Brand/Business Name</Label>
                        <Input
                          id="businessName"
                          className="mt-1.5"
                          placeholder=""
                          onChange={handleChange}
                        />
                      </div>

                      

                      {/* ---- */}
                      <div>
                        <Label>Business Phone Number</Label>
                        <div className="mt-1.5 flex">
                          <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                            +234
                          </span>
                          <Input
                            id="phone"
                            className="!rounded-l-none"
                            placeholder="8012345678"
                            onChange={handleChange}
                          />
                        </div>
                      </div>


                      {/* ---- */}
                      <div>
                        <Label>Business Description</Label>
                        <Textarea
                          id="desc"
                          rows={5}
                          className="mt-1.5"
                          placeholder="What goods or services does your business provide?"
                          onChange={handleChange}
                        />
                      </div>

                      {/* ---- */}
                      <div>
                        <Label>Industry</Label>
                        <select
                          id="industry"
                          className={`block mt-1.5 w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 ${rounded} ${fontClass} ${sizeClass} ${className}`}
                          onChange={handleChange}
                        >
                          <option defaultValue>What industry does your business operate?</option>
                          <option value="art">Art</option>
                          <option value="beauty">Beauty/Make-Up</option>
                          <option value="blockchain">Blockchain</option>
                          <option value="education">Education</option>
                          <option value="fashion">Fashion</option>
                          <option value="finance">Finance</option>
                          <option value="food products">Food Products</option>
                          <option value="gaming">Gaming</option>
                          <option value="healthcare">Health Care</option>
                          <option value="home goods">Home Goods</option>
                          <option value="household products">Household Products</option>
                          <option value="media and entertainment">Media and Entertainment</option>
                          <option value="music">Music</option>
                          <option value="parenting">Parenting</option>
                          <option value="pets and pet products">Pets & Pet Products</option>
                          <option value="photography">Photography</option>
                          <option value="real estate">Real Estate</option>
                          <option value="sports">Sports</option>
                          <option value="tech startup">Tech Startup</option>
                          <option value="travel">Travel</option>
                        </select>
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
                              <i className="text-lg lab la-facebook-f"></i>
                            </span>
                            <Input
                              id="facebook"
                              className="!rounded-l-none"
                              placeholder="facebook username"
                              sizeClass="h-11 px-4 pl-2 pr-3"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Twitter</Label>
                          <div className="mt-1.5 flex">
                            <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                              <i className="text-lg lab la-twitter"></i>
                            </span>
                            <Input
                              id="twitter"
                              className="!rounded-l-none"
                              placeholder="twitter username"
                              sizeClass="h-11 px-4 pl-2 pr-3"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Instagram</Label>
                          <div className="mt-1.5 flex">
                            <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                              <i className="text-lg lab la-instagram"></i>
                            </span>
                            <Input
                              id="instagram"
                              className="!rounded-l-none"
                              placeholder="instagram username"
                              sizeClass="h-11 px-4 pl-2 pr-3"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>

                      <CheckboxTerms
                        label
                        checked={termsAndConditions}
                        onChange={(isChecked) => setTermsAndConditions(isChecked)}
                      />

                      {/* ---- */}
                      <div className="pt-2">
                        <ButtonPrimary
                          disabled={loading}
                          type="button"
                          className="w-full"
                          onClick={handleSignUp}
                        >
                          Complete profile
                        </ButtonPrimary>

                        <ButtonPrimary
                          className="w-full"
                          disabled={loading}
                          type="button"
                          onClick={handleSignUp}
                        >
                          {loading
                            ? "Complete profile"
                            : "Complete profile"}
                        </ButtonPrimary>
                        {loading && (
                          <div className="flex items-center mt-2">
                            <div className="w-5 h-5 border-b-2 rounded-full border-primary-6000 animate-spin"></div>
                            <span className="ml-2 text-sm">
                              Setting up your awesome profile...give us a few
                              seconds.
                            </span>
                          </div>
                        )}
                        <ToastContainer className="text-sm" />
                      </div>
                      {error && <p className="text-sm text-center text-red-500">{error}</p>}
                    </div>
                  </div>
                </form>
              </div>

              {/* ==== */}
              <span className="block text-center xl:text-end md:text-end text-neutral-700 dark:text-neutral-300">
                Skip? {` `}
                <Link className="text-green-600" to="/brand">
                  Go to dashboard
                </Link>
              </span>
            </div>
          </div>
        </div>
      ) : influencer ? (
        <Login />
      ) : (
        <CreateAccountPage />
      )}
    </div>
  );
};

export default BrandRegistration;
