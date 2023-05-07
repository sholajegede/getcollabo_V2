import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authBrandRoute from "./routes/authBrand.route.js";
import authInfluencerRoute from "./routes/authInfluencer.route.js";
import brandRoute from "./routes/brand.route.js";
import influencerRoute from "./routes/influencer.route.js";
import orderRoute from "./routes/order.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log(error);
  }
};

app.use(cors({ origin: ["http://localhost:3000", "https://test.getcollabo.io", "https://beta.getcollabo.io", "https://getcollabo.io", "https://creators.getcollabo.io", /\.getcollabo\.io$/], credentials: true }));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth-brand", authBrandRoute);
app.use("/api/auth-influencer", authInfluencerRoute);
app.use("/api/brand", brandRoute);
app.use("/api/influencer", influencerRoute);
app.use("/api/orders", orderRoute);
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoute);
app.use("/api/reviews", reviewRoute);


app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

app.use("/", (req, res) => {
	res.send("Welcome to GetCollabo's Server!")
});

app.listen(process.env.PORT || 8800, () => {
  connect();
  console.log("Backend server is running!");
});