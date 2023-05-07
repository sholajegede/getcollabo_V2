import mongoose from "mongoose";
const { Schema } = mongoose;

const BrandVerificationSchema = new Schema(
  {
    brandId: {
      type: String,
      required: true,
    },
    OTP: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now()
    },
    expiryAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 5 * 60000)
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("BrandVerification", BrandVerificationSchema);
