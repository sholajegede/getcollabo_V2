// @ts-nocheck
import React, { FC, useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import NcImage from "shared/NcImage/NcImage";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";
import { useHistory, useParams } from "react-router-dom";
import InfluencerLogin from "containers/PageLogin/InfluencerLogin";
import newRequest from "utils/newRequest";
import { InfluencerData } from "routers/types";

export interface SubmitDeliverableProps {
  className?: string;
}

const SubmitDeliverable: FC<SubmitDeliverableProps> = ({
  className = "",
}) => {
  const { username, indexId } = useParams<{ username: string, indexId: number }>();
  const [datatable, setDatatable] = useState<InfluencerData | {}>({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { influencer } = useContext(InfluencerAuthContext);

  const history = useHistory();

  //
  useEffect(() => {
    newRequest
      .get(`/influencer/datatable/${username}/${indexId}`)
      .then((response) => setDatatable(response.data))
      .catch((err) => setError(err));
  }, [username, indexId]);
  //

  const newLogo = datatable?.logo;
  const newBrand = datatable?.businessName || "";
  const newDeliverable = datatable?.deliverableBooked || "";
  const newAmount = datatable?.amountPaid || 0;

  const handleDeliverableComplete = async () => {
    try {
      setLoading(true);
      const newCompleteEmail = {
        sendBrandName: datatable.businessName,
        sendInfluencerId: influencer._id,
        sendBookingStatus: "Completed",
        sendDeliverableCompleted: datatable.deliverableBooked,
        datatableDataId: datatable._id,
      };

      const response = await newRequest.post(
        "/auth-influencer/submitDeliverable",
        newCompleteEmail
      );
      setLoading(false);
      history.push("/dashboard");

      if (response.data.success) {
        console.log(response.data);
      } else {
        setError("Error submitting deliverable");
      }
    } catch (error) {
      setError("Error submitting deliverable");
    }
  };

  return (
    <div>
      {influencer ? (
        <div className={`nc-SubmitDeliverable mb-20 ${className}`} data-nc-id="SubmitDeliverable">
          <Helmet>
            <title>Submit Dliverable | GetCollabo</title>
          </Helmet>

          {/* HEADER */}
          <div className="w-full">
            <div className="relative w-full h-20 md:h-20 2xl:h-32"></div>
            <div className="container -mt-10 lg:-mt-16">
              <div className="relative bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-8 rounded-3xl md:rounded-[40px] shadow-xl flex flex-col md:flex-row">
                <div className="flex-shrink-0 w-32 mt-12 lg:w-44 sm:mt-0">
                  <NcImage
                    src={newLogo}
                    containerClassName="aspect-w-1 aspect-h-1 rounded-3xl overflow-hidden"
                  />
                </div>
                <div className="flex-grow pt-5 md:pt-1 md:ml-6 xl:ml-14">
                  <div className="max-w-screen-sm ">
                    <h3 className="inline-flex items-center text-lg">
                      Brand: <span className="ml-2 font-semibold">{newBrand}</span>
                    </h3>
                    <div>
                      <h3 className="inline-flex items-center mt-2 text-base">
                        Deliverable: <span className="ml-2 font-semibold">{newDeliverable}</span>
                      </h3>
                    </div>
                    <div>
                      <h3 className="mt-2 text-base capitalize">
                        Amount: <span className="font-semibold text-green-500 dark:text-green-500">N{newAmount.toLocaleString()}</span>
                      </h3>
                    </div>
                  </div>

                  <div className="mt-6 gap-y-4">
                    <div>
                      <ButtonPrimary
                        disabled={loading}
                        sizeClass="px-4 py-1.5 sm:px-5"
                        onClick={handleDeliverableComplete}
                      >
                        {loading ? "Submitting deliverable..." : "Submit now"}
                      </ButtonPrimary>
                      {loading && (
                      <div className="flex items-center mt-2">
                        <div className="w-5 h-5 border-b-2 rounded-full border-primary-6000 animate-spin"></div>
                        <span className="ml-2 text-sm">
                          {`Submitting Deliverable: "${datatable.deliverableBooked}" to ${datatable.businessName}`}
                        </span>
                      </div>
                    )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <InfluencerLogin />
      )}
    </div>
  );
};

export default SubmitDeliverable;