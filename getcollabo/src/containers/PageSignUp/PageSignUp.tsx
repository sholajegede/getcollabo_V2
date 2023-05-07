// @ts-nocheck
import React, { FC, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Link, useHistory } from "react-router-dom";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import newRequest from "utils/newRequest";

export interface PageSignUpProps {
  className?: string;
};


const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {

  const [credentials, setCredentials] = useState({
    email:undefined,
    password:undefined,
  });

  const { loading, error, dispatch} = useContext(InfluencerAuthContext);

  const history = useHistory();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    dispatch({type: "SIGNUP_START"});
    try {
      const influencerSignUp = {
        ...credentials,
      };

      const res = await newRequest.post("/auth-influencer/register", influencerSignUp);
      dispatch({type: "SIGNUP_SUCCESS", payload: res.data});
      history.push("/create-profile");;
    } catch (error) {
      dispatch({type: "SIGNUP_FAILURE", payload: error.response.data})
    }
  };

  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Sign up - Influencer</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Creator/Influencer Signup
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          {/*
          <div className="grid gap-3">
              <div
                className=" flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <img
                  className="flex-shrink-0"
                  src={googleSvg}
                  alt="google icon"
                />
                <h3 className="flex-grow text-sm font-medium text-center text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  Signup with Google
                </h3>
              </div>
          </div>
           OR 
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 text-sm font-medium bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full transform -translate-y-1/2 border top-1/2 border-neutral-100 dark:border-neutral-800"></div>
          </div>
          */}
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                id="email"
                placeholder="example@example.com"
                className="mt-1"
                onChange={handleChange}
              />
            </label>
            <label className="block">
              <span className="flex items-center justify-between text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input
                type="text"
                id="password"
                className="mt-1"
                onChange={handleChange}
              />
            </label>
            <ButtonPrimary disabled={loading} type="button" onClick={handleSignUp}>Sign Up</ButtonPrimary>
            {error && <span>{error.message}</span>}
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <Link className="text-green-600" to="/login-influencer">
              Log In
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
