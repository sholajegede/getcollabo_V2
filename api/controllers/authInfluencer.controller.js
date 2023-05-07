import Influencer from "../models/influencer.js";
import Brand from "../models/brand.js";
import bcrypt from "bcrypt";
import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";
import InfluencerVerification from "../models/influencerVerification.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.titan.email",
  port: 465,
  secure: true,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

export const sendVerificationEmail = async (influencer, email, res) => {
  const OTP = Math.floor(Math.random() * 9000) + 1000;
  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: 'Verify your email address | GetCollabo',
    html: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification | GetCollabo</title>
        </head>
        <body class="font-sans min-w-full overflow-auto leading-2">
          <div class="mx-auto w-70 py-20">
            <p class="text-lg my-4">Hi,</p>
            <p class="my-4">Thank you for signing up with GetCollabo. Use the OTP below to complete your Profile Registration. OTP is valid for 5 minutes</p>
            <h2 class="bg-blue-700 mx-auto max-w-max px-4 py-2 text-white rounded-md">${OTP}</h2>
            <p class="text-sm my-4">Best Regards,<br />Shola, Founder at GetCollabo</p>
            <hr class="border-none border-t-2 border-gray-300" />
            <div class="float-right pt-2 text-gray-500 text-sm font-light">
              <p>GetCollabo, Inc</p>
            </div>
          </div>
        </body>
      </html>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}: ${info.response}`);
    const newVerification = new InfluencerVerification({
      influencerId: influencer._id,
      OTP: OTP,
      createdAt: Date.now(),
      expiryAt: new Date(Date.now() + 5 * 60000),
    });
    await newVerification.save();

    const token = jwt.sign(
      {
        influencerId: influencer._id,
      },
      process.env.JWT_KEY
    );

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(influencer);

  } catch (error) {
    console.error(`Failed to send email to ${email}: ${error.message}`);
    throw new Error('Failed to send verification email');
  }
}

export const register = async (req, res, next) => {
  try {
    const { password } = req.body;

    if (!password || password.length < 8 || !/\d/.test(password) || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[!@#\$%\^&\*\(\)_\+{}\|:"\<\>\?`\-=\[\]\\;',\.\/]/.test(password)) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character' });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newInfluencer = new Influencer({
      email: req.body.email.toLowerCase(), // convert email to lowercase
      password: hash,
      verified: false,
      img: "",
      sampleVideo: "",
      displayName: "",
      username: "",
      isFeatured: null,
      influencerOfTheMonth: null,
      about: "",
      industry: "",
      otherInterests: "",
      tiktokUsername: "",
      instagramUsername: "",
      youtubeUsername: "",
      twitterUsername: "",
      facebookUsername: "",
      linkedinUsername: "",
      tiktok: "",
      instagram: "",
      youtube: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      termsAndConditionsAccepted: null,
      deliverable: [],
      datatable: [
        {
          logo: "",
          businessName: "",
          deliverableBooked: "",
          bookingStatus: null,
          amountPaid: 0,
        },
      ],
    });

    const emailExists = await Influencer.findOne({ email: req.body.email });
    const brandEmailExists = await Brand.findOne({ email: req.body.email });

    if (emailExists) {
      return res.status(400).json({ error: 'This email already exists' });
    }

    if (brandEmailExists) {
      return res.status(400).json({ error: 'This email exists as a brand account' });
    }

    await newInfluencer.save();
    await sendVerificationEmail(newInfluencer, req.body.email, res);
  } catch (error) {
    next(error);
  }
};

export const buildProfile = async (req, res, next) => {
  try {
    const influencerId = req.params.id;
    const completeProfile = req.body;

    // Check if username already exists
    if (completeProfile.username) {
      completeProfile.username = completeProfile.username.toLowerCase();
    }
    const displayNameExists = await Influencer.findOne({ displayName: completeProfile.displayName });
    if (displayNameExists) {
      return res.status(400).json({ error: 'This display name already exists' });
    }
    const usernameExists = await Influencer.findOne({ username: completeProfile.username });
    if (usernameExists) {
      return res.status(400).json({ error: 'This username already exists' });
    }

    // Validate deliverable data
    const deliverables = completeProfile.deliverable;

    if (!deliverables || !deliverables.length) {
      return res.status(400).json({ error: 'Deliverables array is empty' });
    }
    const invalidDeliverables = deliverables.filter((deliverable) => {
      return !deliverable.description || !deliverable.rate || !deliverable.deliveryTime;
    });
    if (invalidDeliverables.length) {
      return res.status(400).json({ error: 'One or more deliverables are incomplete' });
    }

    if (!completeProfile.termsAndConditionsAccepted) {
      return res.status(400).json({ error: 'You must agree to the terms and conditions to complete registration' });
    }

    // Update influencer profile
    const registerInfluencer = await Influencer.findByIdAndUpdate(
      influencerId,
      { $set: completeProfile },
      { new: true }
    );

    res.status(200).json(registerInfluencer);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const verifyOTP = async (req, res, next) => {
  try {
    const { OTP } = req.body;
    const influencerId = req.params.influencerId;

    const verification = await InfluencerVerification.findOne({ influencerId, OTP });

    if (!verification) {
      return next(createError(400, "Invalid OTP"));
    }

    if (verification.expiryAt < Date.now()) {
      return next(createError(400, "OTP expired"));
    }

    const influencer = await Influencer.findById(influencerId);

    if (!influencer) {
      return next(createError(404, "Influencer profile not found"));
    }

    influencer.verified = true;

    await influencer.save();

    if (verification && typeof verification.delete === "function") {
      await verification.delete();
    };

    res.status(200).send("OTP verified successfully");
  } catch (error) {
    next(error);
  }
};

export const resendOTP = async (req, res, next) => {
  try {
    const influencerId = req.params.influencerId;

    const influencer = await Influencer.findById(influencerId);

    if (!influencer) {
      return next(createError(404, "Influencer profile not found"));
    }

    if (influencer.verified) {
      return next(createError(400, "Influencer profile already verified"));
    }

    const verification = await InfluencerVerification.findOne({ influencerId });

    if (!verification) {
      return next(createError(400, "Verification not found"));
    }

    const currentTime = Date.now();

    if (verification.expiryAt > currentTime) {
      const timeLeft = Math.ceil((verification.expiryAt - currentTime) / 1000 / 60);
      return next(createError(400, `OTP can only be resent after ${timeLeft} minute(s)`));
    }

    const OTP = Math.floor(Math.random() * 9000) + 1000;

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: influencer.email,
      subject: 'New Verification Code | GetCollabo',
      html: `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification | GetCollabo</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <script>
              tailwind.config = {
                theme: {
                  extend: {
                    colors: {
                      clifford: '#da373d',
                    }
                  }
                }
              }
            </script>
          </head>
          <body class="font-sans min-w-full overflow-auto leading-2">
            <div class="mx-auto w-70 py-20">
              <p class="text-lg my-4 capitalize">Hi ${influencer.username},</p>
              <p class="my-4">Thank you for signing up with GetCollabo. Use the new OTP to complete your Profile Registration. OTP is valid for 5 minutes</p>
              <h2 class="bg-blue-700 mx-auto max-w-max px-4 py-2 text-white rounded-md">${OTP}</h2>
              <p class="text-sm my-4">Best Regards,<br />Shola, Founder at GetCollabo</p>
              <hr class="border-none border-t-2 border-gray-300" />
              <div class="float-right pt-2 text-gray-500 text-sm font-light">
                <p>GetCollabo, Inc</p>
              </div>
            </div>
          </body>
        </html>`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`OTP resent to ${influencer.email}`);

    verification.OTP = OTP;
    verification.createdAt = currentTime;
    verification.expiryAt = new Date(currentTime + 5 * 60000);

    await verification.save();

    res.status(200).send("OTP resent successfully");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try  {
    const influencer = await Influencer.findOne({ email: req.body.email.toLowerCase() });
    
    if (!influencer)
      return res.status(400).json({ error: 'No creator account with this email was found' });

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      influencer.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ error: 'Your password is incorrect' });

    const token = jwt.sign(
      {
        influencerId: influencer._id,
      },
      process.env.JWT_KEY
    );

    const { password, ...info } = influencer._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("Influencer has been logged out.");
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const influencer = await Influencer.findOne({ email: req.body.email.toLowerCase() });

    if (!influencer) {
      return next(createError(404, "Influencer profile not found with this email"));
    }

    const OTP = Math.floor(Math.random() * 9000) + 1000;

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: 'Password Reset | GetCollabo',
      html: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset | GetCollabo</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <script>
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    clifford: '#da373d',
                  }
                }
              }
            }
          </script>
        </head>
        <body class="font-sans min-w-full overflow-auto leading-2">
          <div class="mx-auto w-70 py-20">
            <p class="text-lg my-4">Hi,</p>
            <p class="my-4">Please use the OTP below to reset your password. OTP is valid for 5 minutes</p>
            <h2 class="bg-blue-700 mx-auto max-w-max px-4 py-2 text-white rounded-md">${OTP}</h2>
            <p class="text-sm my-4">Best Regards,<br />Shola, Founder at GetCollabo</p>
            <hr class="border-none border-t-2 border-gray-300" />
            <div class="float-right pt-2 text-gray-500 text-sm font-light">
              <p>GetCollabo, Inc</p>
            </div>
          </div>
        </body>
      </html>`,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(`Email sent to ${email}: ${info.response}`);

    const newVerification = new InfluencerVerification({
      influencerId: influencer._id,
      OTP: OTP,
      createdAt: Date.now(),
      expiryAt: new Date(Date.now() + 5 * 60000),
    });

    await newVerification.save();

    res.status(200).send("OTP sent successfully to your email");
  } catch (error) {
    next(error);
  }
};

export const verifyPasswordResetOTP = async (req, res, next) => {
  try {
    const { OTP } = req.body;
    const influencerId = req.params.influencerId;

    const verification = await InfluencerVerification.findOne({ influencerId, OTP });

    if (!verification) {
      return next(createError(400, "Invalid OTP"));
    }

    if (verification.expiryAt < Date.now()) {
      return next(createError(400, "OTP expired"));
    }

    res.status(200).send("OTP verified successfully");
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { password, confirmPassword } = req.body;
    const influencerId = req.params.influencerId;

    if (password !== confirmPassword) {
      return next(createError(400, "Passwords do not match"));
    }

    const influencer = await Influencer.findById(influencerId);

    if (!influencer) {
      return next(createError(404, "Influencer not found"));
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    influencer.password = hash;
    await influencer.save();

    res.status(200).send("Password reset successfully");
  } catch (error) {
    next(error);
  }
};

export const sendBookingEmail = async (req) => {
  const {
    influencerImage,
    brandImage,
    brandName,
    aboutBrand,
    bookedDeliverable,
    paidAmount,
    sendAmount,
    timeFrame,
    influencerEmail,
    brandEmail,
    username,
    brandId,
    influencerId,
  } = req.body;

  const bookingData = {
    influencerImage,
    brandImage,
    brandName,
    aboutBrand,
    bookedDeliverable,
    paidAmount,
    sendAmount,
    timeFrame,
    influencerEmail,
    brandEmail,
    username,
    brandId,
    influencerId,
  };

  await Promise.all([sendCreatorBookingEmail(bookingData), sendBrandBookingEmail(bookingData)]);
};

export const sendCreatorBookingEmail = async (bookingData) => {
  const email = bookingData.influencerEmail;
  const id = bookingData.influencerId;

  // Use an object instead of an array for newBrandDatatable
  const newInfluencerDatatable = {
    logo: bookingData.brandImage,
    businessName: bookingData.brandName,
    deliverableBooked: bookingData.bookedDeliverable,
    bookingStatus: true,
    amountPaid: bookingData.paidAmount,
  };

  const options = { new: true }; // return the updated document
  const updateQuery = {
    $push: { 
      datatable: {
        $each: [
          newInfluencerDatatable
        ]
      } 
    }
  };

  // Save the updated document to a variable before sending the email
  const updatedInfluencer = await Influencer.findByIdAndUpdate(
    id,
    updateQuery,
    options
  );

  // Remove the return statement before the .json method
  const newOrder = updatedInfluencer.toJSON();

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: 'You just got booked! | GetCollabo',
    html: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Booking</title>
        </head>
        <body class="font-sans min-w-full overflow-auto leading-2">
          <div class="mx-auto w-70 py-20">
            <p class="text-lg my-4">Hello ${bookingData.username}, </p>
            <p class="my-4">You just got booked, here are the details of your booking</p>
            <p class="my-4">Brand/Business: ${bookingData.brandName}</p>
            <p class="my-4">Brand Info: ${bookingData.aboutBrand}</p>
            <p class="my-4">Deliverable Booked: ${bookingData.bookedDeliverable}</p>
            <p class="my-4">Amount Paid: NGN${bookingData.sendAmount}</p>
            <p class="my-4">Timeframe: ${bookingData.timeFrame}</p>

            <p>Payments received are sent after 24 hours.
            
            <hr class="border-none border-t-2 border-gray-300" />
            <p class="text-sm my-4">Best Regards,<br />Shola, Founder at GetCollabo</p>
            <hr class="border-none border-t-2 border-gray-300" />
            <div class="float-right pt-2 text-gray-500 text-sm font-light">
              <p>GetCollabo, Inc</p>
            </div>
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

  // Return the newOrder variable
  return newOrder;
};

export const sendBrandBookingEmail = async (bookingData) => {
  const email = bookingData.brandEmail;
  const id = bookingData.brandId;

  // Use an object instead of an array for newBrandDatatable
  const newBrandDatatable = {
    img: bookingData.influencerImage,
    creatorUsername: bookingData.username,
    profileLink: `https://getcollabo.io/book/${bookingData.username}`,
    deliverableBooked: bookingData.bookedDeliverable,
    bookingStatus: true,
    amountPaid: bookingData.paidAmount,
  };

  const options = { new: true }; // return the updated document
  const updateQuery = {
    $push: { 
      datatable: {
        $each: [
          newBrandDatatable
        ]
      } 
    }
  };

  // Save the updated document to a variable before sending the email
  const updatedBrand = await Brand.findByIdAndUpdate(
    id,
    updateQuery,
    options
  );

  // Remove the return statement before the .json method
  const newOrder = updatedBrand.toJSON();

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: 'Your booking has been confirmed! | GetCollabo',
    html: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Booking</title>
        </head>
        <body class="font-sans min-w-full overflow-auto leading-2">
          <div class="mx-auto w-70 py-20">
            <p class="text-lg my-4">Hello ${bookingData.brandName}, </p>
            <p class="my-4">You just placed a booking, here are the details.</p>
            <p class="my-4">Brand/Creator: ${bookingData.username}</p>
            <p class="my-4">Deliverable Booked: ${bookingData.bookedDeliverable}</p>
            <p class="my-4">Amount Paid: NGN${bookingData.sendAmount}</p>
            <p class="my-4">Timeframe: ${bookingData.timeFrame}</p>
            
            <hr class="border-none border-t-2 border-gray-300" />
            <p class="text-sm my-4">Best Regards,<br />Shola, Founder at GetCollabo</p>
            <hr class="border-none border-t-2 border-gray-300" />
            <div class="float-right pt-2 text-gray-500 text-sm font-light">
              <p>GetCollabo, Inc</p>
            </div>
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

  // Return the newOrder variable
  return newOrder;
};

export const sendDeliverableEmail = async (req, res) => {

  const {
    sendBrandName,
    sendInfluencerId,
    sendBookingStatus,
    sendDeliverableCompleted,
    datatableDataId
  } = req.body;

  const id = req.body.datatableDataId;

  const brandInfo = req.body.sendDeliverableCompleted;

  const filter = {
    'datatable._id': id // filter by the id field in the datatable array
  };

  const updateQuery = {
    $set: {
      'datatable.$.bookingStatus': false // push the new value into the values field of the matched document
    }
  };

  const updatedDocument = await Influencer.findOneAndUpdate(filter, updateQuery, { new: true });

  const completedOrder = updatedDocument.toJSON();

  const filterBrand = {
    'datatable.deliverableBooked': brandInfo // filter by the id field in the datatable array
  };

  const updateQueryBrand = {
    $set: {
      'datatable.$.bookingStatus': false // push the new value into the values field of the matched document
    }
  };

  const updatedDocumentBrand = await Brand.findOneAndUpdate(filterBrand, updateQueryBrand, { new: true });

  const completedBrandOrder = updatedDocumentBrand.toJSON();

  const brandName = req.body.sendBrandName;
  const brandData = await Brand.findOne({ brandName });

  const influencerId = req.body.sendInfluencerId;
  const influencerData = await Influencer.findById(influencerId);

  const email = brandData.email;

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: 'Your deliverable has been submitted! | GetCollabo',
    html: `<!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>New Booking</title>
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
                    <h2 class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">Hello ${sendBrandName},</h2>
                    <p class="max-w-2xl mx-auto mb-8 font-light text-gray-500 md:mb-12 sm:text-xl dark:text-gray-400">Your deliverable has been completed, here are the details:</p>
                  </div>
                  <div class="card">
                    <p class="mt-1 text-base">Creator: ${influencerData.username}</p>
                    <p class="mt-2 mb-4 text-base">Deliverable Completed: ${sendDeliverableCompleted}</p>
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
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error(`Failed to send email to ${email}: ${error.message}`);
    throw new Error('Failed to send booking email');
  };

  return completedOrder;
};