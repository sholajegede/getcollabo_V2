import express from "express";
import {
  register,
  login,
  logout,
  forgotPassword,
  verifyOTP,
  resendOTP,
  verifyPasswordResetOTP,
  resetPassword,
  sendVerificationEmail,
  verifyDiscountCode,
  brandRegistration,
} from "../controllers/authBrand.controller.js";

const router = express.Router();

router.post("/signup", register);
router.put("/register/:id", brandRegistration);


router.post("/verify/:brandId", verifyOTP);
router.post("/resendOTP/:brandId", resendOTP);

router.post("/login", login);
router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);
router.post("/verify-password-reset/:brandId", verifyPasswordResetOTP);
router.post("/reset-password/:brandId", resetPassword);

router.post("/send-verification-email", sendVerificationEmail);

router.post("/verifyDiscountCode", verifyDiscountCode);

export default router;
