// @ts-nocheck
import React, { FC, useState, useEffect, useContext } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import newRequest from "utils/newRequest";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import Input from "shared/Input/Input";
import Label from "components/Label/Label";
import { InfluencerProfileData } from "routers/types";

interface Bank {
  code: string;
  name: string;
}

interface AccountVerificationResult {
  data: {
    account_name: string;
    account_number: string;
  };
}

interface BankAccountCreatorProps {
  className?: string;
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
}

const BankAccountCreator: FC<BankAccountCreatorProps> = ({
  className = "",
  sizeClass = "h-11 px-4 py-3",
  fontClass = "text-sm font-normal",
  rounded = "rounded-2xl",
}) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [verificationResult, setVerificationResult] =
    useState<AccountVerificationResult | null>(null);

  const [influencerProfile, setInfluencerProfile] = useState<
    InfluencerProfileData | {}
  >({});

  const { influencer, loading, dispatch } = useContext(InfluencerAuthContext);

  const history = useHistory();

  //
  useEffect(() => {
    const fetchInfluencerProfile = async () => {
      const response = await newRequest.get(
        `/influencer/find/${influencer._id}`
      );
      setInfluencerProfile(response.data);
    };
    fetchInfluencerProfile();
  }, [influencer]);
  //

  useEffect(() => {
    // Fetch list of banks from backend
    newRequest
      .get("/influencer/banks")
      .then((response) => {
        setBanks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleBankChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBank(event.target.value);
  };

  const handleAccountNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAccountNumber(event.target.value);
  };

  const handleVerifyAccount = async () => {
    if (!selectedBank) {
      console.log("Please select a bank");
      return;
    }

    try {
      const response = await newRequest.get<AccountVerificationResult>(
        `/influencer/verify-account?account_number=${encodeURIComponent(
          accountNumber
        )}&account_bank=${encodeURIComponent(selectedBank)}`
      );
      setVerificationResult(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const newBankOwnerName = verificationResult?.data.account_name || "";
  const newBankAccountNumber = verificationResult?.data.account_number || "";
  const bank = selectedBank
    ? banks.find((bank) => bank.code === selectedBank)?.name
    : "";

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });

    try {
      const updateBankInfo = {
        bankAccountName: newBankOwnerName,
        bankAccountNumber: newBankAccountNumber,
        bank: bank,
      };

      const res = await newRequest.put(
        `/influencer/bank/${influencer._id}`,
        updateBankInfo
      );
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setVerificationResult(null)
    } catch (error) {
      dispatch({ type: "UPDATE_FAILURE", payload: error.response.data });
    }
  };

  return (
    <div>
      <div className={`nc-BankAccount ${className}`} data-nc-id="BankAccount">
        <Helmet>
          <title>Bank Details - Creator</title>
        </Helmet>
        <div className="container mb-24 lg:mb-32">
          <h2 className="my-12 flex items-center text-3xl leading-[50%] md:text-5xl md:leading-[50%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
            Update Bank Details
          </h2>
          <div className="max-w-md mx-auto space-y-2">
            {/* Bank details */}

            <div className="mb-12">
              <Label>Bank Info</Label>
              <div className="mt-2 divide-y divide-gray-200">
                <div className="mb-2 border border-gray-200 rounded-md shadow dark:border-gray-700">
                  <ul className="px-4 py-3 sm:px-6">
                    <li className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-100">
                          Bank Name: {influencerProfile.bank}
                        </div>

                        <div className="inline-flex text-sm font-medium text-gray-500 dark:text-gray-100">
                          <p className="mr-1">Account Name:</p>
                          {influencerProfile.bankAccountName}
                        </div>
                        <div>
                          <div className="inline-flex text-sm font-medium text-gray-500 dark:text-gray-100">
                            <p className="mr-1">Account Number:</p>
                            {influencerProfile.bankAccountNumber}
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <Label>Account Number</Label>
                <div className="mt-1.5 flex">
                  <Input
                    placeholder="0123456789"
                    type="text"
                    value={accountNumber}
                    onChange={handleAccountNumberChange}
                  />
                </div>
              </div>

              {/* Bank */}
              <div>
                <Label>Select Bank</Label>
                <div className="mt-1.5 flex">
                  <select
                    className={`block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 ${rounded} ${fontClass} ${sizeClass} ${className}`}
                    value={selectedBank}
                    onChange={handleBankChange}
                  >
                    <option value="">--Select Bank--</option>
                    {banks
                      .filter(
                        (bank, index, self) =>
                          index === self.findIndex((b) => b.code === bank.code)
                      )
                      .map((bank) => (
                        <option key={bank.code} value={bank.code}>
                          {bank.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <ButtonPrimary
                onClick={handleVerifyAccount}
                disabled={!selectedBank || !accountNumber}
              >
                Verify Account
              </ButtonPrimary>
            </div>

            {/* ==== */}
            <div className="block text-center text-neutral-700 dark:text-neutral-300">
              <form>
                {verificationResult && verificationResult.data && (
                  <div>
                    <p>Account Name: {verificationResult.data.account_name}</p>
                    <p>
                      Account Number: {verificationResult.data.account_number}
                    </p>
                    {selectedBank ? (
                      <p key={selectedBank.id}>
                        Bank:{" "}
                        {banks.find((bank) => bank.code === selectedBank)?.name}
                      </p>
                    ) : null}
                  </div>
                )}

                {/* Update and Back buttons */}
                <div className="flex flex-col pt-2 mt-6 space-x-0 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                  <ButtonPrimary
                    className="flex-1"
                    disabled={loading}
                    type="button"
                    onClick={handleUpdate}
                  >
                    Update Bank Details
                  </ButtonPrimary>
                  <ButtonSecondary href="/dashboard" className="flex-1">
                    Back
                  </ButtonSecondary>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankAccountCreator;