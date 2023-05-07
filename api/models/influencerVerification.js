import mongoose from "mongoose";
const { Schema } = mongoose;

const InfluencerVerificationSchema = new Schema(
  {
    influencerId: {
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

export default mongoose.model("InfluencerVerification", InfluencerVerificationSchema);
