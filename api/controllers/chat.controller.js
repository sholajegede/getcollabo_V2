import Chat from "../models/chat.js";
import Influencer from "../models/influencer.js";
import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  host: "smtp.titan.email",
  port: 465,
  secure: true,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

export const sendNewChatEmail = async (email, username) => {
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: 'New Message Alert: A brand just slid into your DMs on GetCollabo!',
    html: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Chat</title>
        </head>
        <body className="min-w-full overflow-auto font-sans leading-2">
          <div className="py-20 mx-auto w-70">
            <p className="my-4 text-lg">Hey ${username}! </p>
            <p className="my-4">Just wanted to give you a quick heads up that a brand just sent you a new message on our platform! Log in to your dashboard to check it out and hit them back.</p>
            <p className="my-4">Let me know if you need any help or have any questions!.</p>
            <hr className="border-t-2 border-gray-300 border-none" />
            <p className="my-4 text-sm">Cheers,<br />Shola @ GetCollabo</p>
          </div>
        </body>
      </html>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}: ${info.response}`);
  } catch (error) {
    console.error(`Failed to send email to ${email}: ${error.message}`);
    throw new Error('Failed to send booking email');
  }
};

export const createChat = async (req, res, next) => {
  const newChat = new Chat({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedChat = await newChat.save();

    // send email to receiver
    const receiver = req.body.receiverId;
    const receiverUser = await Influencer.findById(receiver);
    const email = receiverUser.email;
    const username = receiverUser.username;
    await sendNewChatEmail(email, username);
    res.status(200).json(savedChat);
  } catch (error) {
    next(error);
  }
};

export const influencerChats = async (req, res, next) => {
  try {
    const chat = await Chat.find({
      members: { $in: [req.params.influencerId] },
    });

    res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
};

export const brandChats = async (req, res, next) => {
  try {
    const chat = await Chat.find({
      members: { $in: [req.params.brandId] },
    });

    res.status(200).json(chat);
  } catch (error) {
    next(error);
  }
};

export const findChat = async (req, res, next) => {
  try {
    const chats = await Chat.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });

    res.status(200).json(chats);
  } catch (error) {
    next(error);
  }
};
