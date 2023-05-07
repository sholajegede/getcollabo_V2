// @ts-nocheck
import Label from "components/Label/Label";
import React, { FC, useState, useContext } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Input from "shared/Input/Input";
import { Helmet } from "react-helmet";
import { AuthContext } from "context/AuthContext";
import newRequest from "utils/newRequest";
import { Link, useHistory } from "react-router-dom";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import { BiShow, BiHide } from "react-icons/bi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "containers/Onboard/Login";

export interface CreateAccountPageProps {
  className?: string;
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
}

const CreateAccountPage: FC<CreateAccountPageProps> = ({
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);;
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });
  const [error, setError] = useState();

  const { dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch({ type: "SIGNUP_START" });

    try {
      const newBrand = {
        ...credentials,
      };

      const res = await newRequest.post("/auth-brand/signup", newBrand);
      dispatch({ type: "SIGNUP_SUCCESS", payload: res.data });
      setLoading(false);
      history.push("/verifyBrand");
    } catch (error) {
      dispatch({ type: "SIGNUP_FAILURE", payload: error?.response?.data });
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

  const { influencer } = useContext(InfluencerAuthContext);
  const { brand } = useContext(AuthContext);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      {influencer || brand ? (
        <Login />
      ) : (
        <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
          <Helmet>
            <title>Create Brand Account | GetCollabo</title>
          </Helmet>
          <div className="container">
            <div className="max-w-4xl mx-auto my-12 space-y-8 sm:lg:my-16 lg:my-24 sm:space-y-10">
              {/* HEADING */}
              <div className="max-w-2xl">
                <h2 className="text-3xl font-semibold sm:text-4xl">
                  Create Brand Account
                </h2>
                <span className="block mt-3 text-sm xl:text-lg lg:text-lg md:text-sm text-neutral-500 dark:text-neutral-400">
                  Fill in your email and password to get started on
                  Getcollabo.
                </span>
              </div>
              <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
              <div
                className="grid items-center justify-center w-full grid-cols-1 xl:max-w-xl"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSignUp(e);
                  }
                }}
              >
                <form>
                  <div className="grid items-center justify-center w-full grid-cols-1 xl:max-w-xl">
                    <div className="flex-grow max-w-3xl space-y-5 md:mt-0 md:pl-16 sm:space-y-6 md:sm:space-y-7">

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
                        <Label>Password</Label>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className="pr-10 mt-1"
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
                      </div>

                      {/* ---- */}
                      <div className="pt-2">
                        <ButtonPrimary
                          className="w-full"
                          disabled={loading}
                          type="button"
                          onClick={handleSignUp}
                        >
                          {loading
                            ? "Sign up"
                            : "Sign Up"}
                        </ButtonPrimary>
                        {loading && (
                          <div className="flex items-center mt-2">
                            <div className="w-5 h-5 border-b-2 rounded-full border-primary-6000 animate-spin"></div>
                            <span className="ml-2 text-sm">
                              Signing you up..
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
                Already have an account? {` `}
                <Link className="text-green-600" to="/login-brand">
                  Log In
                </Link>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateAccountPage;
