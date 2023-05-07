// @ts-nocheck
import { useContext, useState, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { BsFillImageFill } from "react-icons/bs";
import { TiVideo } from "react-icons/ti";
import newRequest from "utils/newRequest";
import { AuthContext } from "context/AuthContext";
import { useHistory } from "react-router-dom";

export default function NotifyDropdown() {
  const [error, setError] = useState(null);
  const [newNotifs, setNewNotifs] = useState([]);

  const { brand } = useContext(AuthContext);

  const history = useHistory();

  //
  useEffect(() => {
    newRequest
      .get(`/message/getMessages/${brand.businessName}`)
      .then((response) => {
        if (response.data) {
          setNewNotifs(response.data);
        }
      })
      .catch((err) => setError(err));
  }, [brand]);
  //

  const newNotifications = newNotifs.map((item) => {
    return {
      name: item.senderName, // or receiverId, depending on your preference
      senderImage: item.senderImage, // add the URL or path to the influencer's image here
      message: item.text,
      image: item.image,
      video: item.video,
      time: new Date(item.timestamp).toLocaleTimeString([], {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
      href: "/messages",
    };
  });

  const handleDeleteNotification = async (notificationSenderName) => {
    try {
      await newRequest.delete(
        `/message/deleteNotification/${notificationSenderName}`
      );

      const updatedNotifs = newNotifs.filter(
        (notif) => notif.senderName !== notificationSenderName
      );
      setNewNotifs(updatedNotifs);

      history.push("/messages");
    } catch (error) {
      console.error(error);
      setError("Error deleting notification");
    }
  };

  return (
    <div className="">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                 group  p-3 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full inline-flex items-center text-base font-medium hover:text-opacity-100
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative`}
            >
              <span
                className={`${
                  newNotifications.length > 0 ? "block" : "hidden"
                } absolute w-2 h-2 bg-blue-500 rounded-full top-2 right-2 animate-pulse`}
              ></span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className={`${
                  newNotifications.length > 0
                    ? "animate-pulse animate-spin"
                    : ""
                }`}
              >
                <path
                  d="M12 6.43994V9.76994"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                />
                <path
                  d="M12.02 2C8.34002 2 5.36002 4.98 5.36002 8.66V10.76C5.36002 11.44 5.08002 12.46 4.73002 13.04L3.46002 15.16C2.68002 16.47 3.22002 17.93 4.66002 18.41C9.44002 20 14.61 20 19.39 18.41C20.74 17.96 21.32 16.38 20.59 15.16L19.32 13.04C18.97 12.46 18.69 11.43 18.69 10.76V8.66C18.68 5 15.68 2 12.02 2Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                />
                <path
                  d="M15.33 18.8201C15.33 20.6501 13.83 22.1501 12 22.1501C11.09 22.1501 10.25 21.7701 9.65004 21.1701C9.05004 20.5701 8.67004 19.7301 8.67004 18.8201"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                />
              </svg>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-xs px-4 mt-3 sm:max-w-sm -right-28 sm:right-0 sm:px-0">
                <div className="overflow-hidden shadow-lg rounded-2xl ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-8 bg-white dark:bg-neutral-800 p-7">
                    <h3 className="text-xl font-semibold">Notifications</h3>
                    {newNotifications.length ? (
                      <div className="space-y-4">
                        {newNotifications
                          .slice(0, 3)
                          .reverse()
                          .map((item, index) => (
                            <Link
                              key={index}
                              to={item.href}
                              className="relative flex p-2 pr-8 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                              onClick={() =>
                                handleDeleteNotification(item.name)
                              }
                            >
                              <img
                                src={item.senderImage}
                                className="object-cover w-10 h-10 rounded-full"
                                alt="notification_image"
                              />
                              <div className="ml-3 space-y-1 sm:ml-4">
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                                  {item.name}
                                  {item.image && (
                                    <BsFillImageFill
                                      size={18}
                                      className="mt-1.5"
                                    />
                                  )}
                                  {item.video && (
                                    <TiVideo size={22} className="mt-1.5" />
                                  )}
                                </p>
                                <p className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                                  {item.message}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-gray-400">
                                  {item.time}
                                </p>
                              </div>
                              <span className="absolute w-2 h-2 transform -translate-y-1/2 bg-blue-500 rounded-full right-1 top-1/2"></span>
                            </Link>
                          ))}
                        {newNotifications.length > 3 && (
                          <Link
                            to="/messages"
                            className="text-xs text-gray-400 dark:text-gray-400"
                          >
                            +{newNotifications.length - 3} more notifications
                          </Link>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">
                        No new notifications
                      </p>
                    )}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}