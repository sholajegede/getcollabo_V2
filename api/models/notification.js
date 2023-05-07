import mongoose from "mongoose";
const { Schema } = mongoose;

const NotificationSchema = new Schema(
  {
    senderId: {
      type: String,
    },
    receiverName: {
      type: String,
    },
    receiverEmail: {
      type: String,
    },
    senderName: {
      type: String,
    },
    senderImage: {
      type: String,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    video: {
      type: String,
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Notification", NotificationSchema);