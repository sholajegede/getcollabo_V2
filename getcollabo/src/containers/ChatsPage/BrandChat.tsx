// @ts-nocheck
import React, { FC, useContext, useState, useEffect, useRef } from "react";
import BrandLogin from "containers/PageLogin/BrandLogin";
import { AuthContext } from "context/AuthContext";
import newRequest from "utils/newRequest";
import BrandConversation from "components/Conversation/BrandConversation";
import BrandChatBox from "components/ChatBox/BrandChatBox";
import { io } from "socket.io-client";
import { Helmet } from "react-helmet";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { MdArrowBackIosNew } from "react-icons/md";

export interface BrandChatProps {
  className?: string;
}

const BrandChat: FC<BrandChatProps> = ({ className = "" }) => {
  const { brand } = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [error, setError] = useState({});
  const [showChatList, setShowChatList] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);

  const socket = useRef();

  //
  useEffect(() => {
    newRequest
      .get(`/chat/${brand?._id}`)
      .then((response) => {
        if (response.data) {
          setChats(response.data);
        }
      })
      .catch((err) => setError(err));
  }, [brand]);
  //

  //
  useEffect(() => {
    socket.current = io("ws://localhost:8000");
    socket.current.emit("new-chat-user", brand?._id);
    socket.current.on("get-chat-users", (chatUsers: any) => {
      setOnlineUsers(chatUsers);
    });
  }, [brand]);
  //

  // Send message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);
  //

  // Receive message from socket server
  useEffect(() => {
    socket.current.on("receive-message", (data: any) => {
      setReceiveMessage(data);
    });
  }, []);
  //

  const handleChatClick = (chat: any) => {
    setCurrentChat(chat);
    setShowChatList(false);
  };

  const handleBackClick = () => {
    setCurrentChat(null);
    setShowChatList(true);
  };

  const checkOnlineStatus = (chat: any) => {
    if (!chat) {
      return false;
    }
    const chatMember = chat.members.find((member: any) => member !== brand?._id);
    const online = onlineUsers.find((chatUser) => chatUser.id === chatMember);
    return online ? true : false;
  };

  return (
    <>
      {brand ? (
        <div
          className={`nc-BrandChat container ${className}`}
          data-nc-id="Chat"
        >
          <Helmet>
            <title>Messages | GetCollabo</title>
          </Helmet>
          <header className="max-w-2xl mx-auto my-10 text-center">
            <h2 className="flex items-center text-3xl leading-[115%] md:text-4xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
              Messages
            </h2>
          </header>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
            {/* Left Side */}
            <div
              className={`${
                showChatList ? "" : "hidden"
              } lg:flex flex-col col-span-1 gap-4 lg:col-span-2`}
            >
              <div className="flex flex-col gap-4 bg-cardColor rounded-xl p-4 h-auto min-h-[80vh] border-2 border-gray-300 dark:border-gray-700">
                <h2 className="text-xl font-bold">Chats</h2>
                <div className="flex flex-col gap-4">
                  <div className="space-y-2 conversation">
                    {Array.isArray(chats) && chats.length > 0 ? (
                      chats
                        .slice()
                        .reverse()
                        .map((chat) => (
                          <div
                            key={chat._id}
                            onClick={() => handleChatClick(chat)}
                            className="hover:bg-gray-300 hover:cursor-pointer"
                          >
                            <BrandConversation
                              data={chat}
                              currentUserId={brand?._id}
                              online={checkOnlineStatus(chat)}
                            />
                          </div>
                        ))
                    ) : (
                      <p>No conversations started</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div
              className={`${
                showChatList ? "hidden" : ""
              } flex flex-col col-span-1 gap-4 lg:col-span-3`}
            >
              <div className="relative flex-1 min-h-0">
                <ButtonSecondary
                  onClick={handleBackClick}
                  sizeClass="py-1.5 px-4"
                  className="mb-8"
                >
                  <MdArrowBackIosNew className="mr-1" size={18}/>
                  <span className="mr-2">Back</span>
                </ButtonSecondary>

                <BrandChatBox
                  chat={currentChat}
                  currentUser={brand?._id}
                  setSendMessage={setSendMessage}
                  receiveMessage={receiveMessage}
                  online={checkOnlineStatus(currentChat)}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <BrandLogin />
      )}
    </>
  );
};

export default BrandChat;
