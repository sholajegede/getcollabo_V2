// @ts-nocheck
import React, { FC, useContext, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import { Link } from "react-router-dom";
import Label from "components/Label/Label";
import { useHistory } from "react-router-dom";
import { AuthContext } from "context/AuthContext";
import newRequest from "utils/newRequest";

export interface ForgotPasswordInfluencerProps {
  className?: string;
}

const ForgotPasswordInfluencer: FC<ForgotPasswordInfluencerProps> = ({ className = "" }) => {
  const [userEmail, setUserEmail] = useState({
    email: undefined,
  });
  const [error, setError] = useState({});

  const { loading } = useContext(AuthContext);

  const history = useHistory();

  const handleChange = (e) => {
    setUserEmail((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth-influencer/forgot-password", userEmail);
      console.log(res.status);
      history.push(`/verifyCreatorOTP/${userEmail.email}`);
    } catch (error) {
      console.log(error.message);
      setError({ message: "Your email is not registered" });
    }
  };

  
  return (
    <div
      className={`nc-ForgotPasswordInfluencer ${className}`}
      data-nc-id="ForgotPasswordInfluencer"
    >
      <Helmet>
        <title>Forgot Password | Creator </title>
      </Helmet>
      <div className="container mt-32 mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Forgot Password
        </h2>
        <div className="max-w-md mx-auto space-y-8">
          {/* FORM */}
          <div
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleReset(e);
              }
            }}
          >
            <form className="grid grid-cols-1 gap-4">
              <div>
                <Label>Email Address</Label>
                <div className="mt-1.5 flex">
                  <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                    <i className="text-2xl las la-envelope"></i>
                  </span>
                  <Input
                    type="email"
                    id="email"
                    className="!rounded-l-none"
                    placeholder="example@email.com"
                    onChange={handleChange}
                  />
                </div>
                <span className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                  Enter your email address to receive a verification code.
                </span>
              </div>

              <ButtonPrimary disabled={loading} onClick={handleReset} className="mt-6" type="button">
                Send
              </ButtonPrimary>
              {error && <p className="justify-center text-sm text-center text-red-500">{error.message}</p>}
            </form>
          </div>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Remember Password? {` `}
            <Link className="text-green-600" to="/login-creator">
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordInfluencer;
