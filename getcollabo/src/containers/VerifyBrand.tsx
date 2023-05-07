// @ts-nocheck
import React, { FC, useState, useContext, useEffect, useRef } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Helmet } from "react-helmet";
import newRequest from "utils/newRequest";
import { AuthContext } from "context/AuthContext";
import { useHistory } from "react-router-dom";

export interface VerifyBrandProps {
  className?: string;
}

const VerifyBrand: FC<VerifyBrandProps> = ({ className = "" }) => {
  const { brand, loading } = useContext(AuthContext);
  const [timerCount, setTimerCount] = useState(60);
  const [otpInput, setOtpInput] = useState<Array<string>>(["", "", "", ""]);
  const history = useHistory();
  const [error, setError] = useState({});

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const nextInput = inputRefs.current[+name + 1];
    
    // Handle paste event
    if (e.type === "paste") {
      e.preventDefault();
      const pastedText = e.clipboardData.getData("text");
      const pastedDigits = pastedText.split("");
      setOtpInput(prevState => {
        const newState = [...prevState];
        for (let i = 0; i < 4 && i < pastedDigits.length; i++) {
          newState[i] = pastedDigits[i];
        }
        return newState;
      });
      return;
    }
    
    // Handle regular input event
    setOtpInput(prevState => prevState.map((digit, index) => index === +name ? value : digit));
    
    if (value && nextInput) {
      nextInput.focus();
    }
  };


  const handleVerification = async (e) => {
    e.preventDefault();
    try {
      const newOTP = {
        OTP: parseInt(otpInput.join(''), 10)
      }
      const verify = await newRequest.post(`/auth-brand/verify/${brand._id}`, newOTP);
      console.log(verify.status);
      history.push("/brand-verified");
    } catch (error) {
      console.log(error);
      setError({ message: "This OTP Code has expired. Please, click on the 'Resend OTP' Button" });
    }
  };

  const resendOTP = async (e) => {
    e.preventDefault();
    setTimerCount(60); // reset timer
    try {
      const resend = await newRequest.post(`/auth-brand/resendOTP/${brand._id}`);
      console.log(resend.status);
    } catch (error) {
      console.log(error);
    }
  };

  // start timer when timerCount changes
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timerCount > 0) {
        setTimerCount(timerCount - 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timerCount]);

  return (
    <div className={`nc-VerifyBrand ${className}`} data-nc-id="VerifyBrand">
      <Helmet>
        <title>Verify Brand | GetCollabo</title>
      </Helmet>
      <div className="container">
        <div className="max-w-3xl mx-auto my-12 space-y-10 sm:lg:my-16 lg:my-24 sm:space-y-10">
          <div className="mt-28 md:mt-32 lg:mt-40 xl:mt-40 sm:mt-32">
            <div className="">
              <div className="w-full max-w-lg px-6 pt-10 mx-auto border-2 shadow-xl pb-9 rounded-2xl">
                <div className="flex flex-col w-full max-w-md mx-auto space-y-16">
                  <div className="flex flex-col items-center justify-center space-y-2 text-center">
                    <div className="text-3xl font-semibold">
                      <p>Account Verification</p>
                    </div>
                    <div className="flex flex-row text-sm font-medium text-gray-400">
                      <p>We have sent a 4-digits OTP verification code to {brand.email}</p>
                    </div>
                  </div>

                  <div
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleVerification(e);
                      }
                    }}
                  >
                    <form>
                      <div className="flex flex-col space-y-16">
                        <div className="flex flex-row items-center justify-between w-full max-w-xs mx-auto">
                          {otpInput.map((digit, index) => (
                            <div className="w-16 h-16" key={index}>
                              <input
                                ref={el => (inputRefs.current[index] = el)}
                                maxLength={1}
                                className="flex flex-col items-center justify-center w-full h-full px-5 text-2xl text-center bg-white border border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 rounded-2xl"
                                type="text"
                                name={String(index)}
                                value={digit}
                                onChange={handleOtpChange}
                                onPaste={handleOtpChange}
                              />
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-col space-y-5">
                          <div>
                            <ButtonPrimary
                              disabled={loading}
                              type="button"
                              className="w-full py-4"
                              onClick={handleVerification}
                            >
                              Verify Account
                            </ButtonPrimary>
                          </div>

                          <div className="flex flex-row items-center justify-center space-x-1 text-sm font-medium text-center text-gray-500">
                            <p>Didn't receive code?</p>{" "}
                            {timerCount === 0 ? (
                              <button
                                type="button"
                                className="text-green-600 hover:underline focus:outline-none dark:hover:text-green-600 hover:text-green-600"
                                onClick={resendOTP}
                              >
                                Resend OTP
                              </button>
                            ) : (
                              <p className="text-green-600">You can Resend OTP in {timerCount} seconds</p>
                            )}
                          </div>
                          {error && <span className="justify-center text-sm text-center">{error.message}</span>}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyBrand;
