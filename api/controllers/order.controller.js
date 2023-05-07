import Order from "../models/order.js";
import Influencer from "../models/influencer.js";
import createError from "../utils/createError.js";
import Stripe from "stripe";

export const intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE);

  const influencer = await Influencer.findById(req.params.id);

  const deliverable = {
    description: influencer.deliverable.description,
    rate: influencer.deliverable.rate,
    deliveryTime: influencer.deliverable.deliveryTime,
  };

  const paymentIntent = await stripe.paymentIntents.create({
    amount: deliverable.rate * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newOrder = new Order({
    deliverableId: influencer.deliverable._id,
    img: influencer.img,
    buyerId: req.brandId,
    sellerId: influencer._id,
    deliverableDesc: deliverable.description,
    deliverableRate: deliverable.rate,
    payment_intent: paymentIntent.id,
  });

  await newOrder.save();

  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.influencerId
        ? { sellerId: req.influencerId }
        : { buyerId: req.brandId }),
      isCompleted: true,
    });

    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
};

export const confirm = async (req, res, next) => {
  try {
    const orders = await Order.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    res.status(200).json(orders).send("Order has been confirmed.");
  } catch (error) {
    next(error);
  }
};
