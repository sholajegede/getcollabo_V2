import Influencer from "../models/influencer.js";
import Review from "../models/review.js";
import createError from "../utils/createError.js";

export const createReview = async (req, res, next) => {
  if (req.influencerId)
    return next(createError(403, "Creators can't write a review!"));

  const newReview = new Review({
    brandId: req.body.brandId,
    influencerId: req.body.influencerId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    const review = await Review.findOne({
      influencerId: req.body.influencerId,
      brandId: req.body.brandId,
    });

    if (review)
      return next(
        createError(
          403,
          "You have already created a review for this creator!"
        )
      );

    //TODO: check if the brand made a booking.

    const savedReview = await newReview.save();

    await Influencer.findByIdAndUpdate(req.body.influencerId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });
    res.status(201).send(savedReview);
  } catch (error) {
    next(error);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({
      influencerId: req.params.id,
    });
    res.status(200).send(reviews);
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const deleted = await Review.findByIdAndDelete(req.params.id);
    res.status(200).send(deleted);
  } catch (error) {
    next(error);
  }
};
