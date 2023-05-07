// @ts-nocheck
import React, { FC, useEffect, useState } from "react";
import newRequest from "utils/newRequest";
import { InfluencerData } from "routers/types";
import { BiMessageSquareDetail } from "react-icons/bi";

export interface BrandConversationProps {
  className?: string;
  data?: any;
  currentUserId?: string;
  online?: boolean;
}

const BrandConversation: FC<BrandConversationProps> = ({
  className = "",
  data,
  currentUserId,
  online,
}) => {
  const [influencerData, setInfluencerData] = useState<InfluencerData>({});
  const [error, setError] = useState({});

  useEffect(() => {
    const influencerId = data?.members?.find((id: any) => id !== currentUserId);
    newRequest
      .get(`/influencer/find/${influencerId}`)
      .then((response) => {
        if (response.data) {
          setInfluencerData(response.data);
        }
      })
      .catch((err) => setError(err));
  }, []);

  return (
    <div
      className={`nc-BrandConversation ${className} mt-2`}
      data-nc-id="BrandConversation"
    >
      <div className="mt-1 bg-white dark:bg-gray-800">
        <div className="px-4 py-3 border-2 rounded-xl dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
          <div className="flex items-center space-x-4">
            <img
              className="object-cover w-10 h-10 rounded-full"
              src={
                influencerData?.img ||
                "https://res.cloudinary.com/newlink/image/upload/v1678639550/user.jpg"
              }
              alt=""
            />
            <div className="flex-grow">
              <p className="text-base font-semibold text-gray-900 dark:text-white">
                {influencerData?.username || ""}
              </p>
              {online ? (
                <p className="text-xs text-green-500">Online</p>
              ) : (
                <p className="text-xs text-gray-500">Offline</p>
              )}
            </div>
            {online && (
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandConversation;
