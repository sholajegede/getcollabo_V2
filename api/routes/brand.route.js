import express from "express";
import {
  deleteBrand,
  getBrand,
  updateBrand,
  getAllBrandAccounts,
  getBrandByEmail,
} from "../controllers/brand.controller.js";

const router = express.Router();

router.delete("/:id", deleteBrand);

router.put("/:id", updateBrand);

router.get("/:id", getBrand);

router.get("/getByEmail/:email", getBrandByEmail);

router.get("/", getAllBrandAccounts);

export default router;
