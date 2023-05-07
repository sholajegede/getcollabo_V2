import express from "express";
import {
  createMessage,
  getMessages,
  getNotifications,
  deleteNotification,
  createNotification,
} from "../controllers/message.controller.js";

const router = express.Router();

router.post("/", createMessage);
router.post("/notification", createNotification);
router.get("/:chatId", getMessages);
router.get("/getMessages/:receiverName", getNotifications);

router.delete("/deleteNotification/:senderName", deleteNotification);

export default router;
