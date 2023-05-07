// @ts-nocheck
import React, { FC, useContext, useEffect, useState } from "react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { Helmet } from "react-helmet";
import Label from "components/Label/Label";
import { Link, useParams, Redirect } from "react-router-dom";
import { AuthContext } from "context/AuthContext";
import Textarea from "shared/Textarea/Textarea";
import { InfluencerData } from "routers/types";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import newRequest from "utils/newRequest";

export interface PagePayNoFeeProps {
  className?: string;
}

const PagePayNoFee: FC<PagePayNoFeeProps> = ({ className = "" }) => {
  const { username, deliverableId } = useParams<{ username: string; deliverableId: string }>();
  const [influencer, setInfluencer] = useState<InfluencerData>({});
  const [deliverable, setDeliverable] = useState<InfluencerData | {}>({});
  const [error, setError] = useState();
  const [discountError, setDiscountError] = useState();
  const [accessBrand, setAccessBrand] = useState<{ verified: boolean }>({ verified: false });
  const [pageBrand, setPageBrand] = useState<any>({});

  //Discount Code
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isValidDiscount, setIsValidDiscount] = useState(false);

  const { brand } = useContext(AuthContext);

  useEffect(() => {
    if (brand.email == null) {
      return <Redirect to="/login" />;
    }
  }, [brand]);

  //
  useEffect(() => {
    newRequest
      .get(`/influencer/get/${username}`)
      .then((response) => {
        if (response.data) {
          setInfluencer(response.data);
        }
      })
      .catch((err) => setError(err));
  }, [username]);
  //

  //
  useEffect(() => {
    newRequest
      .get(`/influencer/deliverable/${username}/${deliverableId}`)
      .then((response) => setDeliverable(response.data))
      .catch((err) => setError(err));
  }, [username, deliverableId]);
  //

  //
  useEffect(() => {
    newRequest
      .get(`/brand/${brand._id}`)
      .then((response) => setPageBrand(response.data))
      .catch((err) => setError(err));
  }, [brand]);
  //

  useEffect(() => {
    // this function will run whenever the component mounts or whenever brand.verified changes
    if (pageBrand.verified === true) {
      setAccessBrand({ verified: true });
    } else {
      setError("Brand is not verified.");
      console.log(error);
    }
  }, [pageBrand]);

  const newRate = deliverable?.rate;
  const newDescription = deliverable?.description || "";
  const newDeliveryTime = deliverable?.deliveryTime || "";

  const formatRate = (newRate: string) => {
    if (newRate == null) {
      return "";
    }
    return newRate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formattedRate = formatRate(newRate);

  const rateNumber = parseFloat(newRate);

  const applyDiscount = async () => {
    try {
      const newDiscountCode = {
        discountCode: discountCode,
      }

      const res = await newRequest.post("/auth-brand/verifyDiscountCode", newDiscountCode);
      console.log(res.status);
      if (res.status) {
        setIsValidDiscount(true);
        setDiscountAmount(5000);
      }
    } catch (error) {
      if (error.response) {
        setDiscountError(error.response.data.error); 
      } else {
        setDiscountError(error.message);
      }
    }
  };

  const totalAmount = rateNumber - discountAmount;

  const formatNumber = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatTotalAmount = (totalAmount = 0) => {
    return formatNumber(totalAmount);
  };

  const formattedAmount = formatTotalAmount(totalAmount);


  const config = {
    public_key: process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY || "",
    tx_ref: Date.now(),
    amount: totalAmount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: brand.email,
      phone_number: brand.phone,
      name: brand.businessName,
    },
    customizations: {
      title: "GetCollabo FLW",
      description: "Payments are insured by GetCollabo.",
      logo: "https://res.cloudinary.com/newlink/image/upload/v1680022658/GetCollabo%20Logo.png",
    }, 
  };

  const fwConfig = {
    ...config,
    tx_ref: Date.now().toString(),
    text: "Place booking",
    callback: async (response: any) => {
      console.log(response);

      if (response) {
        const bookingEmail = {
          brandName: brand.businessName,
          aboutBrand: brand.desc,
          deliverableBooked: newDescription,
          amountPaid: formattedRate,
          timeFrame: newDeliveryTime,
          email: influencer.email,
          username: influencer.username, 
        };

        try {
          const response = await newRequest.post("/auth-influencer/booking-email", bookingEmail);
          console.log(response);
        } catch (err) {
          setError(err);
        }
      }

      closePaymentModal(() => {
        window.location.href = "/confirmed";
      }); // this will close the modal programmatically
    },
    onClose: () => {
      // add the redirect inside the onClose callback function
      window.location.href = `/book/${username}`;
    },
  };

  return (
    <>
      <div className={`nc-PagePayNoFee ${className}`} data-nc-id="PagePayNoFee">
        <Helmet>
          <title>Make Payment | GetCollabo</title>
        </Helmet>
        <div className="container">
          <div className="max-w-3xl mx-auto my-12 space-y-8 sm:lg:my-16 lg:my-24 sm:space-y-10">
            {/* HEADING */}
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold sm:text-4xl">
                Booking Order
              </h2>
              <span className="block mt-3 text-sm text-neutral-500 lg:text-base md:text-base dark:text-neutral-400">
                Make payment for "{newDescription}" offered by:{" "}
                <span className="capitalize">{username}</span>.
              </span>
            </div>
            <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
            <div className="mt-10 space-y-5 md:mt-0 sm:space-y-6 md:sm:space-y-8">
              <label className="block mt-8">
                <Label>Brand</Label>
                <Textarea
                  disabled
                  defaultValue={brand.businessName}
                  name="brand_id"
                  className="mt-1"
                  rows={1}
                />
              </label>

              <label className="block mt-6">
                <Label>Brand Email</Label>
                <div className="mt-1.5 flex">
                  <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                    <i className="text-2xl las la-envelope"></i>
                  </span>
                  <Textarea
                    disabled
                    defaultValue={brand.email}
                    name="brand_email"
                    className="!rounded-l-none"
                    rows={1}
                  />
                </div>
              </label>

              <div className="w-full mt-20 border-b-2 border-neutral-100 dark:border-neutral-700"></div>

              <label className="block mt-12">
                <Label>Creator</Label>
                <Textarea
                  disabled
                  defaultValue={username}
                  name="influencer_id"
                  className="mt-1 capitalize"
                  rows={1}
                />
              </label>

              <label className="block mt-6">
                <Label>Deliverable</Label>
                <Textarea
                  disabled
                  defaultValue={newDescription}
                  name="influencer_deliverable"
                  className="mt-1"
                  rows={1}
                />
              </label>

              <label className="block mt-6">
                <Label>Delivery Time</Label>
                <Textarea
                  disabled
                  defaultValue={newDeliveryTime}
                  name="influencer_deliveryTime"
                  className="mt-1"
                  rows={1}
                />
              </label>

              <label className="block mt-6">
                <Label>Booking Rate</Label>
                <div className="mt-1.5 flex">
                  <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                    NGN
                  </span>
                  <Textarea
                    disabled
                    defaultValue={formattedRate}
                    name="influencer_rate"
                    className="!rounded-l-none"
                    rows={1}
                  />
                </div>
              </label>

              {newRate > 6000 && (
                <>
                  <label className="block mt-6">
                    <Label>Discount Code</Label>  
                    <Textarea
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      placeholder="Enter discount code"
                      id="discountCode"
                      name="discountCode"
                      className="mt-1"
                      rows={1}
                    />            
                    <span className="text-xs text-green-500">
                      {isValidDiscount && <p className="mt-1 text-xs text-green-500">NGN 5,000 discount applied</p>}
                      {discountError && <p className="mt-1 text-xs text-red-500">{discountError}</p>}
                    </span>
                  </label>

                  <ButtonSecondary onClick={applyDiscount} className="w-full mb-6">
                    Apply Discount
                  </ButtonSecondary>
                </>
              )}

              <label className="block mt-6">
                <Label className="text-xl">
                  Total Payment:{" "}
                  <span className="text-green-500">{`NGN ${formattedAmount}`}</span>
                </Label>
              </label>

              {accessBrand.verified ? (
                <div className="flex flex-col pt-2 mt-4 space-x-0 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                  <FlutterWaveButton
                    {...fwConfig}
                    className="relative inline-flex items-center justify-center h-auto px-4 py-3 text-sm font-medium transition-colors rounded-full disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 dark:text-neutral-200 sm:px-6 sm:text-base"
                  />
                  <Link to={`/book/${username}`}>
                    <ButtonSecondary type="button">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M9.57 5.92993L3.5 11.9999L9.57 18.0699"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M20.5 12H3.67004"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="ml-2">Back</span>
                    </ButtonSecondary>
                  </Link>
                </div>
              ) : (
                <div>
                  <div className="flex flex-col pt-2 mt-4 space-x-0 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                    <Link to="/verifyBrand" className="relative inline-flex items-center justify-center h-auto px-4 py-3 text-sm font-medium transition-colors rounded-full disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50 dark:text-neutral-200 sm:px-6 sm:text-base">
                      <span>Verify Brand</span>
                    </Link>
                    <Link to={`/book/${username}`}>
                      <ButtonSecondary type="button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M9.57 5.92993L3.5 11.9999L9.57 18.0699"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M20.5 12H3.67004"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="ml-2">Back</span>
                      </ButtonSecondary>
                    </Link>
                  </div>
                  <div>
                    <p className="mt-4 text-sm">You need to verify your brand before you can place a booking</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PagePayNoFee;
