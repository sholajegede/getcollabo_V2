import mongoose from "mongoose";
const { Schema } = mongoose;

const InfluencerSchema = new Schema(
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
    img: {
      type: String,
      required: false,
    },
    sampleVideo: {
      type: String,
      required: false,
    },
    displayName: {
      type: String,
      required: false,
      unique: true,
    },
    username: {
      type: String,
      required: false,
      unique: true,
    },
    about: {
      type: String,
      required: false,
    },
    industry: {
      type: String,
      required: false,
    },
    otherInterests: {
      type: String,
      required: false,
    },
    tiktokUsername: {
      type: String,
    },
    instagramUsername: {
      type: String,
    },
    youtubeUsername: {
      type: String,
    },
    twitterUsername: {
      type: String,
    },
    facebookUsername: {
      type: String,
    },
    linkedinUsername: {
      type: String,
    },
    tiktok: {
      type: String,
    },
    instagram: {
      type: String,
    },
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    deliverable: [
      {
        description: String,
        rate: Number,
        deliveryTime: String,
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    totalStars: {
      type: Number,
      default: 0,
    },
    starNumber: {
      type: Number,
      default: 0,
    },
    influencerOfTheMonth: {
      type: Boolean,
      default: false,
    },
    bookings: {
      type: Number,
      default: 0,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    bankAccountName: {
      type: String,
    },
    bankAccountNumber: {
      type: String,
    },
    bank: {
      type: String,
    },
    activeOrders: {
      type: Number,
      default: 0,
    },
    completedOrders: {
      type: Number,
      default: 0,
    },
    brandsWorkedWith: {
      type: Number,
      default: 0,
    },
    revenue: {
      type: Number,
      default: 0,
    },
    datatable: [
      {
        logo: String,
        businessName: String,
        deliverableBooked: String,
        bookingStatus: Boolean,
        amountPaid: Number,
      },
    ],
    termsAndConditionsAccepted: {
      type: Boolean,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Influencer", InfluencerSchema);
