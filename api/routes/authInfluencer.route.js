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
  sendBookingEmail,
  buildProfile,
  sendDeliverableEmail,
} from "../controllers/authInfluencer.controller.js";

const router = express.Router();

router.post("/register", register);
router.put("/build/:id", buildProfile);


router.post("/verify/:influencerId", verifyOTP);
router.post("/resendOTP/:influencerId", resendOTP);

router.post("/login", login);
router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);
router.post("/verify-password-reset/:influencerId", verifyPasswordResetOTP);
router.post("/reset-password/:influencerId", resetPassword);


router.post("/booking-email", sendBookingEmail);

router.post("/submitDeliverable", sendDeliverableEmail);

export default router;
