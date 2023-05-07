// @ts-nocheck
import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import { Link, useLocation, useHistory } from "react-router-dom";
import { InfluencerData } from "routers/types";
import newRequest from "utils/newRequest";
import { BiShow, BiHide } from "react-icons/bi";

export interface ChangePasswordInfluencerProps {
  className?: string;
}

const ChangePasswordInfluencer: FC<ChangePasswordInfluencerProps> = ({ className = "" }) => {
  const location = useLocation();
  const email = location.pathname.split("/").pop();
  const [influencer, setInfluencer] = useState<InfluencerData | {}>({});
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState({
    password:undefined,
    confirmPassword:undefined,
  });
  const [error, setError] = useState({});

  //
  useEffect(() => {
    async function fetchData() {
      const response = await newRequest.get(`/influencer/getByEmail/${email}`);
      setInfluencer(response.data);
    }
    fetchData();
  }, [email]);
  //

  const history = useHistory();

  const handleChange = (e) => {
    setNewPassword(prev => ({ ...prev, [e.target.id]: e.target.value}));
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      const sendPassword = {
        ...newPassword,
      }
      const changePassword = await newRequest.post(`/auth-influencer/reset-password/${influencer._id}`, sendPassword);
      console.log(changePassword.status);
      history.push("/reset-successful");
    } catch (error) {
      console.log(error.message);
      setError({ message: "Your passwords do not match" });
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className={`nc-ChangePasswordInfluencer ${className}`} data-nc-id="ChangePasswordInfluencer">
      <Helmet>
        <title>Creator Password Reset - GetCollabo</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Change Password
        </h2>
        <div className="max-w-md mx-auto space-y-8">
          {/* FORM */}
          <div
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handlePasswordReset(e);
              }
            }}
          >
            <form className="grid grid-cols-1 gap-4">
              <label className="block">
                <span className="flex items-center justify-between text-neutral-800 dark:text-neutral-200">
                  New Password
                </span>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="mt-1"
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? <BiShow /> : <BiHide />}
                  </button>
                </div>
              </label>

              <label className="block">
                <span className="flex items-center justify-between text-neutral-800 dark:text-neutral-200">
                  Confirm Password
                </span>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    className="mt-1"
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? <BiShow /> : <BiHide />}
                  </button>
                </div>
              </label>
              {error && <span className="justify-center mt-2 text-sm text-center">{error.message}</span>}
              <ButtonPrimary className="mt-6" type="button" onClick={handlePasswordReset}>Reset Password</ButtonPrimary>
            </form>
          </div>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Remember Password? {` `}
            <Link className="text-green-600" to="/login">
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordInfluencer;
