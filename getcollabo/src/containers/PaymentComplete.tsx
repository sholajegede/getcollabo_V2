// @ts-nocheck
import React, { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { Helmet } from "react-helmet";
import NcImage from "shared/NcImage/NcImage";
import GetCollaboTicket from "images/bookingticket.png";

export interface PaymentCompleteProps {
  className?: string;
}

const PaymentComplete: FC<PaymentCompleteProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-PaymentComplete ${className}`}
      data-nc-id="PaymentComplete"
    >
      <Helmet>
        <title>Payment Confirmed | GetCollabo</title>
      </Helmet>
      <div className="container">
        <div className="max-w-3xl mx-auto my-12 space-y-8 sm:lg:my-16 lg:my-24 sm:space-y-10">
          {/* HEADING */}
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Payment Confirmed
            </h2>
          </div>
          <div className="w-full border-b-2 border-neutral-100 dark:border-neutral-700"></div>
          <div className="">
            <span className="text-sm">
              Your booking has been placed! You will receive an email with a receipt confirming
              your booking order.
            </span>

            <div className="flex items-center justify-center p-5 mt-4 bg-transparent rounded-xl">
              <NcImage className="w-full rounded-xl" src={GetCollaboTicket} />
            </div>

            <div className="flex flex-col pt-2 mt-4 space-x-0 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
              <ButtonPrimary href={"/search"} type="button">
                Book another creator
              </ButtonPrimary>
              <ButtonSecondary type="button" href={"/brand"}>
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
                <span className="ml-2">Back to Dashboard</span>
              </ButtonSecondary>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentComplete;
