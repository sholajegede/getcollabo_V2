import express from "express";
import {
  createChat,
  influencerChats,
  brandChats,
  findChat,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.post('/', createChat);
router.get('/:influencerId', influencerChats);
router.get('/:brandId', brandChats);
router.get('/find/:firstId/:secondId', findChat);

export default router;
    