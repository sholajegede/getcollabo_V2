// @ts-nocheck
import React, { FC, useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import { Link, useHistory } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { AuthContext } from "context/AuthContext";
import newRequest from "utils/newRequest";
import Checkbox from "shared/Checkbox/Checkbox";
import Label from "components/Label/Label";
import { BiShow, BiHide } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface BrandLoginProps {
  className?: string;
}

const BrandLogin: FC<BrandLoginProps> = ({ className = "" }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });
  const [error, setError] = useState();

  const { loading, dispatch } = useContext(AuthContext);

  const history = useHistory();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await newRequest.post("/auth-brand/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

      // Store login info in localStorage if "Remember me" is checked
      if (rememberMe) {
        localStorage.setItem("brandEmail", credentials.email);
        localStorage.setItem("brandPassword", credentials.password);
      }

      history.push("/brand");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error?.response?.data });
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

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("brandEmail");
    const storedPassword = localStorage.getItem("brandPassword");
    if (storedEmail && storedPassword) {
      setCredentials({ email: storedEmail, password: storedPassword });
      setRememberMe(true);
    }
  }, []);

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Brand Login - GetCollabo</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Brand Login
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <div
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin(e);
              }
            }}
          >
            <form className="grid grid-cols-1 gap-6">
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
              </div>

              <label className="block">
                <span className="flex items-center justify-between text-neutral-800 dark:text-neutral-200">
                  Password
                  <Link
                    to="/forgot-password-brand"
                    className="text-sm text-green-600"
                  >
                    Forgot password?
                  </Link>
                </span>
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
              </label>
              <Checkbox
                label="Remember me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />

              <ButtonPrimary
                disabled={loading}
                type="button"
                onClick={handleLogin}
              >
                Log In
              </ButtonPrimary>
              <ToastContainer className="text-sm" />
              {error && (
                <p className="justify-center text-sm text-center text-red-500">
                  {error}
                </p>
              )}
            </form>
          </div>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            First time? {` `}
            <Link className="text-green-600" to="/create-brand">
              Create a brand account
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BrandLogin;
