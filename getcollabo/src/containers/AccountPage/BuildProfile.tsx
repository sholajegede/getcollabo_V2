// @ts-nocheck
import React, { FC, useState, useContext, useEffect, useReducer } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";
import { Helmet } from "react-helmet";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import newRequest from "utils/newRequest";
import FormItem from "components/FormItem";
import { useHistory } from "react-router-dom";
import upload from "utils/upload";
import uploadVideo from "utils/uploadVideo";
import { AuthContext } from "context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiInstagramFill, RiTwitterFill, RiYoutubeFill } from "react-icons/ri";
import { SiTiktok } from "react-icons/si";
import { AiOutlineVideoCameraAdd, AiOutlineFieldTime } from "react-icons/ai";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";
import { TbCurrencyNaira } from "react-icons/tb";
import CheckboxTerms from "shared/Checkbox/CheckboxTerms";
import Login from "containers/Onboard/Login";
import CreateInfluencerAccountPage from "./CreateInfluencerAccountPage";
import { Link } from "react-router-dom";
import { deliverableReducer, INITIAL_STATE } from "reducers/deliverableReducer";
import { v4 as uuidv4 } from "uuid";
import { BiAddToQueue } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";

export interface BuildProfileProps {
  className?: string;
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
}

const BuildProfile: FC<BuildProfileProps> = ({
  className = "",
  sizeClass = "h-11 px-4 py-3",
  fontClass = "text-sm font-normal",
  rounded = "rounded-2xl",
}) => {
  const [state, dispatch] = useReducer(deliverableReducer, INITIAL_STATE);
  const [file, setFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [credentials, setCredentials] = useState({
    displayName: undefined,
    username: undefined,
    about: undefined,
    industry: undefined,
    otherInterests: undefined,
    tiktokUsername: undefined,
    instagramUsername: undefined,
    twitterUsername: undefined,
    youtubeUsername: undefined,
    facebookUsername: undefined,
    linkedinUsername: undefined,
  });
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch: authDispatch, influencer } = useContext(
    InfluencerAuthContext
  ); // rename dispatch to authDispatch
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [errorVideoMessage, setErrorVideoMessage] = useState("");

  const { brand } = useContext(AuthContext);

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

  const handleVideoInputChange = (event) => {
    const file = event.target.files[0];
    const fileSize = file.size; // in bytes
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes

    if (fileSize > maxSize) {
      setErrorVideoMessage("File size exceeds 10MB limit.");
      event.target.value = null; // reset input value
      setVideoFile(null); // reset video file
    } else {
      setVideoFile(file);
      setErrorVideoMessage("");
    }
  };

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleAddDeliverable = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const descriptionInput = document.getElementById(
      "description"
    ) as HTMLInputElement;
    const rateInput = document.getElementById("rate") as HTMLInputElement;
    const deliveryTimeInput = document.getElementById(
      "deliveryTime"
    ) as HTMLSelectElement;

    const description = descriptionInput.value;
    const rate = Number(rateInput.value);
    const deliveryTime = deliveryTimeInput.value;

    const newDeliverable = {
      _id: uuidv4(),
      description,
      rate,
      deliveryTime,
    };
    dispatch({ type: "ADD_DELIVERABLE", payload: newDeliverable });

    // reset form values
    descriptionInput.value = "";
    rateInput.value = "";
    deliveryTimeInput.value = "Choose";
  };

  const handleRemoveDeliverable = (deliverableId) => {
    dispatch({ type: "REMOVE_DELIVERABLE", payload: deliverableId });
  };

  useEffect(() => {
    console.log("termsAndConditions changed:", termsAndConditions);
  }, [termsAndConditions]);

  const passingDeliverable = state.deliverable.map((deliverable) => ({
    description: deliverable.description,
    rate: deliverable.rate,
    deliveryTime: deliverable.deliveryTime
  }));


  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    authDispatch({ type: "REGISTRATION_START" });
    const url = await upload(file);
    const videoUrl = await uploadVideo(videoFile);

    try {
      const newInfluencer = {
        ...credentials,
        deliverable: passingDeliverable,
        img: url,
        sampleVideo: videoUrl,
        termsAndConditionsAccepted: termsAndConditions,
      };

      const res = await newRequest.put(
        `/auth-influencer/build/${influencer._id}`,
        newInfluencer
      );
      authDispatch({ type: "REGISTRATION_SUCCESS", payload: res.data });
      setLoading(false);
      history.push("/dashboard");
    } catch (error) {
      authDispatch({
        type: "REGISTRATION_FAILURE",
        payload: error.response.data,
      });
      setLoading(false);
      if (error.response) {
        setError(error.response.data.error);
        toast.error(error.response.data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        setError(error.message);
        toast.error(error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  };

  return (
    <div>
      {influencer ? (
        <div
          className={`nc-BuildProfile ${className}`}
          data-nc-id="BuildProfile"
        >
          <Helmet>
            <title>Build Profile | GetCollabo</title>
          </Helmet>
          <div className="container">
            <div className="max-w-4xl mx-auto my-12 space-y-8 sm:lg:my-16 lg:my-24 sm:space-y-10">
              {/* HEADING */}
              <div className="max-w-2xl">
                <h2 className="text-3xl font-semibold sm:text-4xl">
                  Build Profile
                </h2>
                <span className="block mt-3 text-sm xl:text-lg lg:text-lg md:text-sm text-neutral-500 dark:text-neutral-400">
                  Set your preferred profile image, display name, username,
                  industry, deliverables and booking rates
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
                <div className="mt-10 space-y-5 md:mt-0 sm:space-y-6 md:sm:space-y-8">
                  {/* ---- */}

                  <div>
                    <h3 className="text-base font-medium sm:text-base">
                      Upload Profile Image
                    </h3>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">
                      File types supported: JPG, JPEG, and PNG.
                    </span>
                    <div className="mt-2">
                      <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-dashed border-neutral-300 dark:border-neutral-6000 rounded-2xl">
                        <div className="relative flex items-center justify-center w-32 h-32 overflow-hidden rounded-2xl">
                          <img
                            src={
                              file
                                ? URL.createObjectURL(file)
                                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt="Uploaded image"
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
                            <span className="mt-1 text-xs">Upload Image</span>
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
                      {errorMessage && (
                        <p className="mt-1 text-xs text-red-500">
                          {errorMessage}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-medium sm:text-base">
                      Upload Video Sample
                    </h3>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">
                      File types supported: MP4, MOV, and AVI.
                    </span>
                    <div className="mt-2">
                      <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-dashed border-neutral-300 dark:border-neutral-6000 rounded-2xl">
                        <div className="relative flex items-center justify-center w-32 h-32 overflow-hidden rounded-2xl">
                          <video
                            src={
                              videoFile ? URL.createObjectURL(videoFile) : ""
                            }
                            alt="Uploaded video"
                          />
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black cursor-pointer bg-opacity-60 text-neutral-50">
                            <AiOutlineVideoCameraAdd size={30} />
                            <span className="mt-1 text-xs">Upload Video</span>
                            <p className="mt-1 text-xs">Max size: 10MB</p>
                          </div>
                          <input
                            type="file"
                            id="file"
                            accept=".mp4,.mov,.avi"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onInput={handleVideoInputChange}
                          />
                        </div>
                      </div>
                      {errorVideoMessage && (
                        <p className="mt-1 text-xs text-red-500">
                          {errorVideoMessage}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ---- */}
                  <FormItem label="Display Name">
                    <Input
                      placeholder="E.g: The Wisdom Man"
                      id="displayName"
                      onChange={handleChange}
                    />
                  </FormItem>

                  {/* ---- */}
                  <FormItem
                    label="Username"
                    desc={<div>Your social media username</div>}
                  >
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-xs border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                        getcollabo.io/book/
                      </span>
                      <Input
                        id="username"
                        onChange={handleChange}
                        className="!rounded-l-none"
                        type="text"
                        placeholder=""
                      />
                    </div>
                  </FormItem>

                  {/* ---- */}
                  <FormItem
                    label="Bio"
                    desc={
                      <div>
                        Write a bit about yourself here.{" "}
                        <span className="text-green-500">Be original</span>.
                      </div>
                    }
                  >
                    <Textarea
                      id="about"
                      onChange={handleChange}
                      rows={6}
                      className="mt-1.5"
                      placeholder="..."
                    />
                  </FormItem>

                  {/* ---- */}
                  <FormItem label="Industry">
                    <select
                      id="industry"
                      className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 ${rounded} ${fontClass} ${sizeClass} ${className}`}
                      onChange={handleChange}
                    >
                      <option defaultValue>Choose an industry</option>
                      <option value="art">Art</option>
                      <option value="beauty">Beauty</option>
                      <option value="blockchain">Blockchain</option>
                      <option value="business">Business</option>
                      <option value="dance">Dance</option>
                      <option value="fashion">Fashion</option>
                      <option value="finance">Finance</option>
                      <option value="food">Food</option>
                      <option value="gaming">Gaming</option>
                      <option value="health">Health</option>
                      <option value="lifestyle">Lifestyle</option>
                      <option value="music">Music</option>
                      <option value="photography">Photography</option>
                      <option value="real estate">Real Estate</option>
                      <option value="skits">Skits</option>
                      <option value="storytelling">Storytelling</option>
                      <option value="sports">Sports</option>
                      <option value="tech">Tech</option>
                      <option value="travel">Travel</option>
                    </select>
                  </FormItem>

                  {/* ---- */}
                  <FormItem
                    label="Other Industries/Interests"
                    desc={
                      <div>
                        Type in other industries/interests that's not on the
                        list (Please include a comma after each one.)
                      </div>
                    }
                  >
                    <Input id="otherInterests" onChange={handleChange} />
                  </FormItem>

                  <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
                  <div>
                    <h3 className="text-lg font-semibold sm:text-2xl">
                      Add Socials
                    </h3>
                    <span className="text-xs">
                      Please add your social media usernames for each platform.
                      If you do not have an account on a platform, leave it
                      blank.
                    </span>

                    <div className="mt-4 grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-2.5">
                      {/* ---- */}
                      <FormItem>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 text-xs border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                            <SiTiktok className="w-4 h-4" />
                          </span>
                          <Input
                            id="tiktokUsername"
                            onChange={handleChange}
                            className="!rounded-l-none"
                            type="text"
                            placeholder=""
                          />
                        </div>
                      </FormItem>

                      {/* ---- */}
                      <FormItem>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 text-xs border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                            <RiInstagramFill className="w-4 h-4" />
                          </span>
                          <Input
                            id="instagramUsername"
                            onChange={handleChange}
                            className="!rounded-l-none"
                            type="text"
                            placeholder=""
                          />
                        </div>
                      </FormItem>

                      {/* ---- */}
                      <FormItem>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 text-xs border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                            <RiYoutubeFill className="w-4 h-4" />
                          </span>
                          <Input
                            id="youtubeUsername"
                            onChange={handleChange}
                            className="!rounded-l-none"
                            type="text"
                            placeholder=""
                          />
                        </div>
                      </FormItem>

                      {/* ---- */}
                      <FormItem>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 text-xs border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                            <RiTwitterFill className="w-4 h-4" />
                          </span>
                          <Input
                            id="twitterUsername"
                            onChange={handleChange}
                            className="!rounded-l-none"
                            type="text"
                            placeholder=""
                          />
                        </div>
                      </FormItem>

                      {/* ---- */}
                      <FormItem>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 text-xs border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                            <FaFacebookF className="w-4 h-4" />
                          </span>
                          <Input
                            id="facebookUsername"
                            onChange={handleChange}
                            className="!rounded-l-none"
                            type="text"
                            placeholder=""
                          />
                        </div>
                      </FormItem>

                      {/* ---- */}
                      <FormItem>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 text-xs border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                            <FaLinkedin className="w-4 h-4" />
                          </span>
                          <Input
                            id="linkedinUsername"
                            onChange={handleChange}
                            className="!rounded-l-none"
                            type="text"
                            placeholder=""
                          />
                        </div>
                      </FormItem>
                    </div>
                  </div>

                  <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
                  <h3 className="text-lg font-semibold sm:text-2xl">
                    Add Deliverables
                  </h3>

                  <form
                    action=""
                    onSubmit={handleAddDeliverable}
                    className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-5 sm:gap-2.5"
                  >
                    {/* ---- */}
                    <FormItem
                      label="Deliverable"
                      desc={
                        <div>
                          <span className="text-green-500">Eg: </span>1
                          Instastory and TikTok Promotions
                        </div>
                      }
                    >
                      <Input id="description" type="text" />
                    </FormItem>

                    {/* ---- */}
                    <FormItem
                      label="Rate"
                      desc={
                        <div>
                          <span className="text-green-500">Eg: </span>
                          10000
                        </div>
                      }
                    >
                      <div className="flex">
                        <span className="inline-flex items-center px-3 text-xs border border-r-0 rounded-l-2xl border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
                          <TbCurrencyNaira className="w-4 h-4" />
                        </span>
                        <Input
                          id="rate"
                          type="number"
                          className="!rounded-l-none"
                        />
                      </div>
                    </FormItem>

                    <FormItem label="Timeframe">
                      <select
                        id="deliveryTime"
                        className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 ${rounded} ${fontClass} ${sizeClass} ${className}`}
                      >
                        <option defaultValue>Choose</option>
                        <option value="1 day">1 day</option>
                        <option value="2 days">2 days</option>
                        <option value="3 days">3 days</option>
                        <option value="4 days">4 days</option>
                        <option value="5 days">5 days</option>
                        <option value="1 week">1 week</option>
                        <option value="2 weeks">2 weeks</option>
                      </select>
                    </FormItem>

                    <div>
                      <button
                        type="submit"
                        className="inline-flex py-2 mt-8 ml-2"
                      >
                        <BiAddToQueue
                          className="mr-2 fill-green-500"
                          size={25}
                        />
                        Add deliverable
                      </button>
                    </div>
                  </form>

                  {state?.deliverable?.length > 0 && (
                    <div className="divide-y divide-gray-200">
                      {state.deliverable.map((deliverable) => (
                        <div
                          key={deliverable._id}
                          className="mb-2 border border-gray-200 rounded-md shadow dark:border-gray-700"
                        >
                          <ul className="px-4 py-3 sm:px-6">
                            <li className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-100">
                                  Deliverable: {deliverable.description}
                                </div>

                                <div className="inline-flex text-sm font-medium text-gray-500 dark:text-gray-100">
                                  <p className="mr-1">Rate:</p>
                                  <TbCurrencyNaira size={18} />
                                  {deliverable.rate.toLocaleString()}
                                </div>
                                <div>
                                  <div className="inline-flex text-sm font-medium text-gray-500 dark:text-gray-100">
                                    <p className="mr-1">Timeframe:</p>
                                    <AiOutlineFieldTime size={17} />
                                    {deliverable.deliveryTime}
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => handleRemoveDeliverable(deliverable._id)}
                                className="p-1 text-gray-400 rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                <MdDeleteForever className="fill-red-500" size={24} />
                              </button>
                            </li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  <CheckboxTerms
                    label
                    checked={termsAndConditions}
                    onChange={(isChecked) => setTermsAndConditions(isChecked)}
                  />

                  {/* ---- */}
                  <div className="flex flex-col items-center justify-center pt-2 space-x-0 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                    <ButtonPrimary
                      className="w-full mt-3"
                      disabled={loading}
                      type="button"
                      onClick={handleSignUp}
                    >
                      {loading ? "Building your profile..." : "Build profile"}
                    </ButtonPrimary>
                    <ToastContainer className="text-sm" />
                  </div>
                  {loading && (
                    <div className="flex items-center mt-2">
                      <div className="w-5 h-5 border-b-2 rounded-full border-primary-6000 animate-spin"></div>
                      <span className="ml-2 text-sm">
                        Setting up your awesome profile...give us a few seconds.
                      </span>
                    </div>
                  )}

                  {error && (
                    <p className="text-sm text-center text-red-500">{error}</p>
                  )}
                </div>
              </div>

              {/* ==== */}
              <span className="block text-center xl:text-end md:text-end text-neutral-700 dark:text-neutral-300">
                Skip? {` `}
                <Link className="text-green-600" to="/dashboard">
                  Go to dashboard
                </Link>
              </span>
            </div>
          </div>
        </div>
      ) : brand ? (
        <Login />
      ) : (
        <CreateInfluencerAccountPage />
      )}
    </div>
  );
};

export default BuildProfile;