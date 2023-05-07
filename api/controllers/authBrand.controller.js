import Brand from "../models/brand.js";
import Influencer from "../models/influencer.js";
import bcrypt from "bcrypt";
import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";
import BrandVerification from "../models/brandVerification.js";
import DiscountCode from "../models/discountCode.js";
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

export const sendVerificationEmail = async (brand, email, res) => {
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
            <p class="my-4">Thank you for signing up with GetCollabo. Use the OTP below to complete your Account Registration. OTP is valid for 5 minutes</p>
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
    const newVerification = new BrandVerification({
      brandId: brand._id,
      OTP: OTP,
      createdAt: Date.now(),
      expiryAt: new Date(Date.now() + 5 * 60000),
    });
    await newVerification.save();

    const token = jwt.sign(
      {
        brandId: brand._id,
      },
      process.env.JWT_KEY
    );

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(brand);
  } catch (error) {
    console.error(`Failed to send email to ${email}: ${error.message}`);
    throw new Error('Failed to send verification email');
  }
};

export const register = async (req, res, next) => {
  try {
    const { password } = req.body;

    if (!password || password.length < 8 || !/\d/.test(password) || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[!@#\$%\^&\*\(\)_\+{}\|:"\<\>\?`\-=\[\]\\;',\.\/]/.test(password)) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character' });
    }
    
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newBrand = new Brand({
      email: req.body.email.toLowerCase(), // convert email to lowercase
      password: hash,
      verified: false,
      logo: "",
      businessName: "",
      phone: 0,
      desc: "",
      industry: "",
      website: "",
      instagram: "",
      twitter: "",
      facebook: "",
      discountedCodeApplied: "",
      termsAndConditionsAccepted: null,
      datatable: [
        {
          img: "",
          creatorUsername: "",
          profileLink: "",
          deliverableBooked: "",
          bookingStatus: null,
          amountPaid: 0,
        },
      ],
    });

    const emailExists = await Brand.findOne({ email: req.body.email });
    const influencerEmailExists = await Influencer.findOne({ email: req.body.email });

    if (emailExists) {
      return res.status(400).json({ error: 'This email already exists' });
    }

    if (influencerEmailExists) {
      return res.status(400).json({ error: 'This email exists as an influencer account' });
    }

    await newBrand.save();
    await sendVerificationEmail(newBrand, req.body.email, res);
  } catch (error) {
    next(error);
  }
};

export const brandRegistration = async (req, res, next) => {
  try {
    const brandId = req.params.id;
    const completeRegistration = req.body;

    const phoneExists = await Brand.findOne({ phone: req.body.phone });
    const businessNameExists = await Brand.findOne({ businessName: req.body.businessName });

    if (phoneExists && businessNameExists) {
      return res.status(400).json({ error: 'This phone number and business name already exist' });
    }

    if (phoneExists) {
      return res.status(400).json({ error: 'This phone number already exists' });
    }

    if (businessNameExists) {
      return res.status(400).json({ error: 'This business name already exists' });
    }

    if (!completeRegistration.termsAndConditionsAccepted) {
      return res.status(400).json({ error: 'You must agree to the terms and conditions to complete registration' });
    }

    const registerBrand = await Brand.findByIdAndUpdate(brandId, { $set: completeRegistration }, { new: true });

    res.status(200).json(registerBrand);
  } catch (error) {
    next(error);
  }
};

export const verifyOTP = async (req, res, next) => {
  try {
    const { OTP } = req.body;
    const brandId = req.params.brandId;

    const verification = await BrandVerification.findOne({ brandId, OTP });

    if (!verification) {
      return next(createError(400, "Invalid OTP"));
    }

    if (verification.expiryAt < Date.now()) {
      return next(createError(400, "OTP expired"));
    }

    const brand = await Brand.findById(brandId);

    if (!brand) {
      return next(createError(404, "Brand not found"));
    }

    brand.verified = true;

    await brand.save();

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
    const brandId = req.params.brandId;

    const brand = await Brand.findById(brandId);

    if (!brand) {
      return next(createError(404, "Brand account not found"));
    }

    if (brand.verified) {
      return next(createError(400, "Brand account already verified"));
    }

    const verification = await BrandVerification.findOne({ brandId });

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
      to: brand.email,
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
              <p class="text-lg my-4 capitalize">Hi, ${brand.businessName}</p>
              <p class="my-4">Thank you for signing up with GetCollabo. Use the new OTP to complete your Account Registration. OTP is valid for 5 minutes</p>
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
    console.log(`OTP resent to ${brand.email}`);

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
  try {
    const brand = await Brand.findOne({ email: req.body.email.toLowerCase() });

    if (!brand) return res.status(400).json({ error: 'No brand account with the email was found' });

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      brand.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ error: 'Your password is incorrect' });

    const token = jwt.sign(
      {
        brandId: brand._id,
      },
      process.env.JWT_KEY
    );

    const { password, ...info } = brand._doc;
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
    .send("Brand has been logged out.");
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const brand = await Brand.findOne({ email: req.body.email.toLowerCase() });

    if (!brand) {
      return next(createError(404, "Brand account not found with this email"));
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

    const newVerification = new BrandVerification({
      brandId: brand._id,
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
    const brandId = req.params.brandId;

    const verification = await BrandVerification.findOne({ brandId, OTP });

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
    const brandId = req.params.brandId;

    if (password !== confirmPassword) {
      return next(createError(400, "Passwords do not match"));
    }

    const brand = await Brand.findById(brandId);

    if (!brand) {
      return next(createError(404, "Brand account not found"));
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    brand.password = hash;
    await brand.save();

    res.status(200).send("Password reset successfully");
  } catch (error) {
    next(error);
  }
};

export const verifyDiscountCode = async (req, res, next) => {
  try {
    const { discountCode, brandId } = req.body;

    const discount = await DiscountCode.findOne({ code: discountCode });

    if (!discount) {
      return res.status(400).json({ error: 'This discount code does not exist' });
    }

    if (discount.expiryAt < Date.now()) {
      return res.status(400).json({ error: 'Discount code has expired' });
    }

    if (discount.used) {
      return res.status(400).json({ error: 'This discount code has already been used' });
    }

    discount.used = true;
    await discount.save();

    const brand = await Brand.findById(brandId);
    brand.discountedCodeApplied = discount.code;
    await brand.save();

    res.status(200).send("Discount code enabled!");
  } catch (error) {
    next(error);
  }
};


