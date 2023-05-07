// @ts-nocheck
import React, { FC, useContext, useEffect, useState } from "react";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { Helmet } from "react-helmet";
import Label from "components/Label/Label";
import { Link, useParams, Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "context/AuthContext";
import { InfluencerData } from "routers/types";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import newRequest from "utils/newRequest";
import Input from "shared/Input/Input";

export interface CustomPaymentProps {
  className?: string;
}

const CustomPayment: FC<CustomPaymentProps> = ({
  className = "",
  sizeClass = "h-11 px-4 py-3",
  fontClass = "text-sm font-normal",
  rounded = "rounded-2xl",
 }) => {
  const { username, deliverableId } = useParams<{ username: string; deliverableId: string }>();
  const [influencer, setInfluencer] = useState<InfluencerData>({});
  const [error, setError] = useState();
  const [accessBrand, setAccessBrand] = useState<{ verified: boolean }>({ verified: false });
  const [pageBrand, setPageBrand] = useState<any>({});

  const { brand } = useContext(AuthContext);

  const history = useHistory();

  const [newDeliverable, setNewDeliverable] = useState("");
  const [newDeliveryTime, setNewDeliveryTime] = useState("");
  const [newRate, setNewRate] = useState("");

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

  const handleDeliverableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDeliverable(event.target.value);
  };

  const handleDeliveryTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewDeliveryTime(event.target.value);
  };

  const handleRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewRate(event.target.value);
  };

  
  const formatRate = (newRate: string) => {
    if (newRate == null) {
      return "";
    }
    return newRate.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formattedRate = formatRate(newRate);

  const rateNumber = parseFloat(newRate);

  const fee = rateNumber * 0.04 + 100;
  const totalAmount = rateNumber + fee;


  const formatNumber = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formatFee = (fee = 0) => {
    return formatNumber(fee);
  };

  const formattedFee = formatFee(fee);

  const formatTotalAmount = (totalAmount = 0) => {
    return formatNumber(totalAmount);
  };

  const formattedAmount = formatTotalAmount(totalAmount);


  const config = {
    public_key: process.env.REACT_APP_FLUTTERWAVE_TEST || "FLWPUBK_TEST-7a4e3e1efd5df3cb4c00619d20e26523-X",
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

      if (response.status === "completed") {
        const bookingDetails = {
          influencerImage: influencer.img,
          brandImage: brand.logo,
          brandName: brand.businessName,
          aboutBrand: brand.desc,
          bookedDeliverable: newDeliverable || "No deliverable was added to this custom booking.",
          paidAmount: rateNumber,
          sendAmount: formattedRate || "No rate was chosen for this custom booking.",
          timeFrame: newDeliveryTime || "No delivery time was chosen for this custom booking.",
          influencerEmail: influencer.email,
          brandEmail: brand.email,
          username: influencer.username,
          brandId: brand._id,
          influencerId: influencer._id,
        };

        try {
          const response = await newRequest.post("/auth-influencer/booking-email", bookingDetails);
          history.push("/confirmed");
          console.log(response);
        } catch (err) {
          setError(err);
        }
      }

      closePaymentModal(() => {
        history.push("/confirmed");
      });
    },
    onClose: () => {
      history.push(`/custom-booking/${username}`);
    },
  };

  return (
    <>
      <div className={`nc-CustomPayment ${className}`} data-nc-id="CustomPayment">
        <Helmet>
          <title>Custom Booking | GetCollabo</title>
        </Helmet>
        <div className="container">
          <div className="max-w-3xl mx-auto my-12 space-y-8 sm:lg:my-16 lg:my-24 sm:space-y-10">
            {/* HEADING */}
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold sm:text-4xl">
                Booking Order
              </h2>
              <span className="block mt-3 text-sm text-neutral-500 lg:text-base md:text-base dark:text-neutral-400">
                Place a custom booking order for:{" "}
                <span className="capitalize">{username}</span>.
              </span>
            </div>
            <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
            <div className="mt-10 space-y-5 md:mt-0 sm:space-y-6 md:sm:space-y-8">
              <label className="block mt-8">
                <Label>Brand:</Label>
                <span className="block mt-2 text-base text-neutral-500 lg:text-base md:text-base dark:text-neutral-400">
                  {brand.businessName}
                </span>
              </label>

              <label className="block mt-6">
                <Label>Brand Email:</Label>
                <span className="block mt-2 text-base text-neutral-500 lg:text-base md:text-base dark:text-neutral-400">
                  {brand.email}
                </span>
              </label>

              <div className="w-full mt-20 border-b-2 border-neutral-100 dark:border-neutral-700"></div>

              <label className="block mt-12">
                <Label>Creator:</Label>
                <span className="block mt-2 text-base capitalize text-neutral-500 lg:text-base md:text-base dark:text-neutral-400">
                  {username}
                </span>
              </label>

              <label className="block mt-6">
                <Label>Deliverable</Label>
                <Input
                  type="text" 
                  id="deliverable" 
                  name="deliverable"
                  className="mt-1"
                  placeholder="What is the creator to do?"
                  rows={1.5}
                  value={newDeliverable}
                  onChange={handleDeliverableChange}
                />
              </label>

              <label className="block mt-6">
                <Label>Delivery Time</Label>
                <select
                  className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 ${rounded} ${fontClass} ${sizeClass} ${className}`}
                  id="deliveryTime" 
                  name="deliveryTime"
                  onChange={handleDeliveryTimeChange}
                >
                  <option defaultValue>How long would it take?</option>
                  <option value="1 day">1 day</option>
                  <option value="2 days">2 days</option>
                  <option value="3 days">3 days</option>
                  <option value="4 days">4 days</option>
                  <option value="5 days">5 days</option>
                  <option value="1 week">1 week</option>
                  <option value="2 weeks">2 weeks</option>
                </select>
              </label>

              <label className="block mt-6">
                <Label>Booking Rate</Label>
                <div className="mt-1.5 flex">
                  <span className="inline-flex items-center px-2.5 rounded-l-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                    NGN
                  </span>
                  <Input
                    type="number" 
                    id="rate" 
                    name="rate"
                    className="!rounded-l-none"
                    placeholder="Enter amount"
                    rows={1}
                    value={newRate}
                    onChange={handleRateChange}
                  />
                </div>
                <span className="text-xs text-green-500">
                  Platform Fee:{" "}
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    NGN {formattedFee}{" "}
                    <span className="text-xs">(4% of Booking Rate + NGN 100)</span>
                  </span>
                </span>
              </label>

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
                  <Link to={`/booking/${username}`}>
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
                    <Link to={`/booking/${username}`}>
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

export default CustomPayment;
