import Message from "../models/message.js";
import Notification from "../models/notification.js";
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

export const createMessage = async (req, res, next) => {
  const { chatId, senderId, receiverName, senderName, senderImage, text, image, video } = req.body;

  const newMessage = new Message({
    chatId,
    senderId,
    receiverName,
    senderName,
    senderImage,
    text,
    image,
    video,
  });
  try {
    const message = await newMessage.save();
    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

export const createNotification = async (req, res, next) => {
  const { chatId, senderId, receiverName, receiverEmail, senderName, senderImage, text, image, video } = req.body;

  const messageData = {
    chatId,
    senderId,
    receiverName,
    receiverEmail,
    senderName,
    senderImage,
    text,
    image,
    video
  };
  try {
    await saveNotification(messageData);
    res.status(200).json({ message: 'Notification saved successfully' });
  } catch (error) {
    next(error);
  }
};

export const saveNotification = async (messageData) => {
  const newNotification = new Notification({
    senderId: messageData.senderId,
    receiverName: messageData.receiverName,
    receiverEmail: messageData.receiverEmail,
    senderName: messageData.senderName,
    senderImage: messageData.senderImage,
    text: messageData.text,
    image: messageData.image,
    video: messageData.video,
  });

  const notification = await newNotification.save();

  const notifData = notification.toJSON()

  const email = messageData.receiverEmail;

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: 'Notification: You have a new message! | GetCollabo',
    html: `<!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>New Notification</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.7/tailwind.min.css">
                <style>
                  body {
                    background-color: #F7FAFC;
                  }

                  .card {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 1rem;
                    background-color: #fff;
                    border-radius: 0.5rem;
                    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                  }

                  hr {
                    border-top: 2px solid #E2E8F0;
                  }

                  .float-right {
                    float: right;
                  }
                </style>
                <script src="https://cdn.tailwindcss.com"></script>
              </head>

              <body class="font-sans">
                <section class="px-4 py-16 mx-auto bg-white dark:bg-gray-900 lg:py-16 lg:px-6">
                  <div class="max-w-screen-md mx-auto sm:text-center">
                    <h2 class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">Hello,</h2>
                    <p class="max-w-2xl mx-auto mb-8 font-light text-gray-500 md:mb-12 sm:text-xl dark:text-gray-400">You have a new message notification.</p>
                  </div>
                  <div class="card">
                    <p class="mt-1 text-base capitalize">From: ${messageData.senderName}</p>
                    <p class="mt-2 mb-4 text-base">Message: ${messageData.text}</p>
                    <hr>
                    <p class="my-4 text-sm">Best Regards,<br />Shola, Founder at GetCollabo</p>
                    <p class="mt-10 text-xs">GetCollabo</p>
                    <p class="mt-1 mb-4 text-xs">[Collabo Technologies Limited]</p>
                    <hr>
                  </div>
                </section>
              </body>
            </html>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}: ${info.response}`);
  } catch (error) {
    console.error(`Failed to send email to ${email}: ${error.message}`);
    throw new Error('Failed to send new message email');
  }

  return notifData;
};

export const getMessages = async (req, res, next) => {
  const { chatId } = req.params;
  try {
    const messages = await Message.find({ chatId })
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

export const getNotifications = async (req, res, next) => {
  try {
    const receiverName = req.params.receiverName;

    const messages = await Notification.find({ receiverName });
    if (messages.length === 0) {
      return res.status(404).json({ message: 'You have no new notifications' });
    }

    res.status(200).json(messages);
  } catch (error) {
    next(error);
    return res.status(500).json({ message: 'Error retrieving notifications' });
  }
};

export const deleteNotification = async (req, res,next) => {
  const senderName = req.params.senderName;
  
  try {
    const notifications = await Notification.find({ senderName: senderName });
    
    if (notifications.length === 0) {
      return res.status(404).send("No notifications found for the specified senderName");
    }
    
    await Notification.deleteMany({ senderName: senderName });
    res.status(200).send("All notifications have been deleted!");
  } catch (error) {
    next(error);
    res.status(500).send("Something went wrong");
  }
};
