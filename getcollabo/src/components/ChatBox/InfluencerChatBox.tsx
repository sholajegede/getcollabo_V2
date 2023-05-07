// @ts-nocheck
import React, { FC, useState, useContext, useEffect, useRef } from "react";
import newRequest from "utils/newRequest";
import { BrandData } from "routers/types";
import { format } from "timeago.js";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Textarea from "shared/Textarea/Textarea";
import { BiImageAdd } from "react-icons/bi";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import Linkify from "react-linkify";
import upload from "utils/upload";
import uploadVideo from "utils/uploadVideo";
import NcImage from "shared/NcImage/NcImage";
import NcPlayIcon from "shared/NcPlayIcon/NcPlayIcon";
import { InfluencerAuthContext } from "context/InfluencerAuthContext";

export interface Chat {
  _id: string;
}

export interface Message {
  senderId: string;
  receiverName: string;
  receiverEmail: string;
  text: string;
  chatId: string;
  image: string;
  video: string;
  senderName: string;
  senderImage: string;
}

export interface InfluencerChatBoxProps {
  className?: string;
  chat?: Chat;
  currentUser?: string;
  setSendMessage?: any;
  receiveMessage?: any;
  online?: boolean;
}

const InfluencerChatBox: FC<InfluencerChatBoxProps> = ({
  className = "",
  chat,
  currentUser,
  setSendMessage,
  receiveMessage,
  online,
}) => {
  const { influencer } = useContext(InfluencerAuthContext);
  
  const [brandData, setBrandData] = useState<BrandData>({});
  const [error, setError] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [newImageMessage, setNewImageMessage] = useState("");
  const [newVideoMessage, setNewVideoMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isPlay, setIsPlay] = useState(false);

  const scroll = useRef<HTMLDivElement>(null);

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "10px";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [newMessage]);

  useEffect(() => {
    if (chat !== null) {
      const brandId = chat.members.find((id: string) => id !== currentUser);
      newRequest
        .get(`/brand/${brandId}`)
        .then((response) => {
          if (response.data) {
            setBrandData(response.data);
          }
        })
        .catch((err) => setError(err));
    }
  }, [chat, currentUser]);

  useEffect(() => {
    if (chat !== null) {
      newRequest
        .get(`/message/${chat._id}`)
        .then((response) => {
          if (response.data) {
            setMessages(response.data);
          }
        })
        .catch((err) => setError(err));
    }
  }, [chat]);

  // Always scroll to  the most recent message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(event.target.value);
  };

  const handleFileInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const [file] = event.target.files;
    setFile(file);

    try {
      const [url, previewUrl] = await Promise.all([
        upload(file),
        generatePreview(file),
      ]);
      setNewImageMessage(url);
      setPreviewUrl(previewUrl);
      console.log(url);
    } catch (error) {
      console.log(error);
    }
  };

  const generatePreview = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target.result;
        resolve(url);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleVideoInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const [file] = event.target.files;
    setVideoFile(file);

    try {
      const url = await uploadVideo(file);
      setNewVideoMessage(url);
      setIsPlay(true);
      console.log(url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newMessage.trim() && !file && !videoFile) {
      return;
    }

    const message: Message = {
      senderId: currentUser,
      receiverName: brandData.businessName,
      receiverEmail: brandData.email,
      senderName: influencer.username,
      senderImage: influencer.img,
      text: newMessage,
      chatId: chat._id,
    };

    if (file) {
      try {
        message.image = newImageMessage;
        setNewImageMessage("");
        setPreviewUrl("");
        setFile(null);
      } catch (error) {
        console.log(error);
        return;
      }
    }

    if (videoFile) {
      try {
        message.video = newVideoMessage;
        setNewVideoMessage("");
        setIsPlay(false);
        setVideoFile(null);
      } catch (error) {
        console.log(error);
        return;
      }
    }

    // send message to socket server
    const receiverId = chat.members.find((id: string) => id !== currentUser);
    setSendMessage({ ...message, receiverId });

    try {
      const res = await newRequest.post("/message", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }

    if (!online) {
      try {
        const res = await newRequest.post("/message/notification", message);
        console.log(res);
        setNewMessage("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  //
  useEffect(() => {
    console.log("Message Arrived: ", receiveMessage);
    if (
      receiveMessage !== null &&
      chat !== null &&
      receiveMessage.chatId === chat._id
    ) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage, chat]);
  //

  return (
    <div
      className={`bg-white dark:bg-gray-900 min-h-screen flex flex-col`}
      data-nc-id="InfluencerChatBox"
    >
      {chat && brandData && (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-300 dark:bg-gray-900 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <img
              className="object-cover w-10 h-10 rounded-full"
              src={
                brandData.logo ||
                "https://res.cloudinary.com/newlink/image/upload/v1678639550/user.jpg"
              }
              alt=""
            />
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-800 dark:text-white">
                {brandData.businessName || ""}
              </p>
              {online ? (
                <p className="text-xs text-green-500">Online</p>
              ) : (
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Offline
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 max-h-screen p-3 overflow-y-auto">
        {messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .map((message) => (
          <div
            ref={scroll}
            key={message._id}
            className={
              message.senderId === currentUser
                ? "flex justify-end mb-4"
                : "flex justify-start mb-4"
            }
          >
            <div
              className={
                message.senderId === currentUser
                  ? "bg-primary-6000 text-white py-2 px-4 rounded-tr-none rounded-lg xl:max-w-xs lg:max-w-xs md:max-w-[350px] sm:max-w-[350px] max-w-[250px] relative overflow-hidden"
                  : "bg-gray-200 text-black py-2 px-4 rounded-tl-none rounded-lg xl:max-w-xs lg:max-w-xs md:max-w-[350px] sm:max-w-[350px] max-w-[250px] relative overflow-hidden"
              }
            >
              {message.image &&
                (message.image.includes("res.cloudinary") ||
                  message.image.includes("data:image")) && (
                  <NcImage
                    src={message.image}
                    alt="message image"
                    className="mb-2 rounded-lg"
                  />
                )
              }
              {message.video &&
                (message.video.includes("res.cloudinary") ||
                  message.video.includes("data:image")) && (
                  <div style={{ wordWrap: "break-word" }}>
                    <iframe
                      src={message.video}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                      style={{ maxWidth: "100%", height: "auto" }}
                      className="mb-2 rounded-lg"             
                    ></iframe>
                  </div>
                )
              }
              {message.text && (
                <p className="text-sm" style={{ wordWrap: "break-word" }}>
                  <Linkify
                    componentDecorator={(decoratedHref, decoratedText, key) => (
                      <a href={decoratedHref} key={key} className="underline">
                        {decoratedText}
                      </a>
                    )}
                  >
                    {message.text.replace(
                      /http:\/\/res\.cloudinary\.com\/newlink\/image\/upload\/.*$/g,
                      ""
                    )}
                  </Linkify>
                </p>
              )}
              
              <div className="mt-2 text-xs text-gray-600">
                <span
                  className={
                    message.senderId === currentUser
                      ? "text-xs text-gray-200 block mt-1"
                      : "text-xs text-gray-600 block mt-1"
                  }
                >
                  {format(message.createdAt)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {chat && (
        <form
          className="flex items-center px-4 py-3 border-t border-gray-300 dark:border-gray-700"
          onSubmit={handleSendMessage}
        >
          <div className="flex items-center flex-1 mr-3">
            <label className="relative cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onInput={handleFileInputChange}
              />
              <BiImageAdd className="w-8 h-8 pr-2 text-gray-500 xl:w-10 xl:h-10" />
            </label>
            <label className="relative cursor-pointer">
              <input
                type="file"
                accept=".mp4,.mov,.avi"
                className="hidden"
                onInput={handleVideoInputChange}
              />
              <AiOutlineVideoCameraAdd className="w-8 h-8 pr-2 text-gray-500 xl:w-10 xl:h-10" />
            </label>

            <Textarea
              value={newMessage.replace(
                /http:\/\/res\.cloudinary\.com\/newlink\/image\/upload\/.*$|data:image.*$/g,
                ""
              )}
              onChange={handleChange}
              className="flex-1 h-10 resize-none min-h-10"
              placeholder="Type a message..."
              ref={textareaRef}
            />
          </div>

          <ButtonPrimary type="submit" sizeClass="px-4 py-2 sm:px-5">
            Send
          </ButtonPrimary>
        </form>
      )}

      <div className="flex items-center flex-1 mr-3">
        {previewUrl && (
          <img src={previewUrl} alt="preview" className="w-20 h-20 mr-2 rounded-lg" />
        )}
      </div>

      {newVideoMessage ? (
        <div className="px-4 pt-4 pb-2 text-sm text-neutral-500 dark:text-neutral-400">
          <div className="group aspect-w-16 aspect-h-16 sm:aspect-h-9 bg-neutral-800 rounded-3xl overflow-hidden border-4 border-white dark:border-neutral-900 sm:rounded-[50px] sm:border-[10px] z-0">
            {isPlay ? (
              <iframe
                src={newVideoMessage}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                className="rounded-3xl"
              ></iframe>
            ) : (
              <>
                <div
                  onClick={() => setIsPlay(true)}
                  className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
                >
                  <NcPlayIcon />
                </div>
                <NcImage
                  containerClassName="absolute inset-0 rounded-3xl overflow-hidden z-0"
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-100 "
                  alt="Creator video content"
                  src={previewUrl}
                />
              </>
            )}
          </div>
        </div>
      ) : (
        <div
          className="px-4 pt-4 pb-2 text-sm text-neutral-500 dark:text-neutral-400"
          as="p"
        >
          {""}
        </div>
      )}

      {!chat && <span>Tap on a chat to start a conversation</span>}
    </div>
  );
};

export default InfluencerChatBox;
