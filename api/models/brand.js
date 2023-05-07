import mongoose from "mongoose";
const { Schema } = mongoose;

const BrandSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: false,
    },
    businessName: {
      type: String,
      required: false,
      unique: true,
    },
    phone: {
      type: Number,
      required: false,
      unique: true,
    },
    desc: {
      type: String,
      required: false,
    },
    industry: {
      type: String,
      required: false,
    },
    website: {
      type: String,
      required: false,
    },
    instagram: {
      type: String,
      required: false,
    },
    twitter: {
      type: String,
      required: false,
    },
    facebook: {
      type: String,
      required: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    datatable: [
      {
        img: String,
        creatorUsername: String,
        profileLink: String,
        deliverableBooked: String,
        bookingStatus: Boolean,
        amountPaid: Number,
      },
    ],
    discountedCodeApplied: {
      type: String,
    },
    termsAndConditionsAccepted: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Brand", BrandSchema);
