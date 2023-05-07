import express from "express";
import dotenv from "dotenv";
import {
  deleteInfluencer,
  getInfluencer,
  updateInfluencer,
  getAllInfluencerAccounts,
  getInfluencerProfiles,
  countByIndustry,
  getByBookingRate,
  getInfluencerByUsername,
  getFeatured,
  getInfluencerByEmail,
  updateBankInfo,
  getDeliverableById,
  deleteDeliverable,
  getDatatableById,
} from "../controllers/influencer.controller.js";
import Flutterwave from 'flutterwave-node-v3';
import axios from 'axios';


dotenv.config();
const flw = new Flutterwave(process.env.PUBLIC_KEY, process.env.SECRET_KEY);

const router = express.Router();

router.delete("/:id", deleteInfluencer);

router.put("/:id", updateInfluencer);

router.put("/bank/:id", updateBankInfo);

router.delete("/delete/:id/deliverables/:deliverableId", deleteDeliverable);

router.get("/find/:id", getInfluencer);

router.get("/get/:username", getInfluencerByUsername);

router.get("/getByEmail/:email", getInfluencerByEmail);

router.get("/all", getAllInfluencerAccounts);

router.get("/", getInfluencerProfiles);

router.get("/featured", getFeatured);

//GET ALL
router.get("/countByIndustry", countByIndustry);
router.get("/rates", getByBookingRate);

//Deliverable
router.get('/deliverable/:username/:deliverableId', getDeliverableById);

//Datatable
router.get('/datatable/:username/:indexId', getDatatableById);




// Route for fetching list of banks
router.get('/banks', (req, res, next) => {
  const banksOptions = {
    'method': 'GET',
    'url': 'https://api.flutterwave.com/v3/banks/NG',
    'headers': {
      'Authorization': `Bearer ${process.env.SECRET_KEY}`,
    },
  };
  axios(banksOptions)
    .then(response => {
      const banks = response.data.data;
      res.status(200).json(banks);
    })
    .catch(error => {
      next(error);
    });
});

// Route for verifying account
router.get('/verify-account', async (req, res, next) => {
  try {
    const payload = {
      account_number: req.query.account_number,
      account_bank: req.query.account_bank,
    };
    const response = await axios.post('https://api.flutterwave.com/v3/accounts/resolve', payload, {
      headers: {
        Authorization: `Bearer ${process.env.SECRET_KEY}`,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    next(error);
  }
});

export default router;
