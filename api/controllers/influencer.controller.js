import Influencer from "../models/influencer.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";

export const deleteInfluencer = async (req, res, next) => {
  const influencer = await Influencer.findById(req.params.id);

  if (req.influencerId !== influencer._id.toString()) {
    return next(createError(403, "You can delete only your account!"));
  }
  await Influencer.findByIdAndDelete(req.params.id);
  res.status(200).send("Your influencer account has been deleted!");
};

export const getInfluencer = async (req, res, next) => {
  try {
    const influencer = await Influencer.findById(req.params.id);
    res.status(200).json(influencer);
  } catch (error) {
    next(error);
  }
};

export const getInfluencerByUsername = async (req, res, next) => {
  try {
    const username = req.params.username;

    const influencer = await Influencer.findOne({ username });
    if (!influencer) {
      return res.status(404).json({ message: 'Influencer not found' });
    }

    res.status(200).json(influencer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error retrieving influencer data' });
  }
};

export const getDeliverableById = async (req, res, next) => {
  try {
    const influencer = await Influencer.findOne({
      username: req.params.username,
    });
    const deliverableId = req.params.deliverableId;
    const deliverable = influencer.deliverable.id(deliverableId);
    if (!deliverable) {
      return res.status(404).json({ message: "Deliverable not found" });
    }
    res.status(200).json(deliverable);
  } catch (error) {
    next(error);
  }
};

export const getDatatableById = async (req, res, next) => {
  try {
    const influencer = await Influencer.findOne({
      username: req.params.username,
    });
    const indexId = req.params.indexId;
    const datatable = influencer.datatable.id(indexId);
    if (!datatable) {
      return res.status(404).json({ message: "Deliverable not found" });
    }
    res.status(200).json(datatable);
  } catch (error) {
    next(error);
  }
};

export const getInfluencerByEmail = async (req, res, next) => {
  try {
    const influencer = await Influencer.findOne({
      email: req.params.email,
    });
    res.status(200).json(influencer);
  } catch (error) {
    next(error);
  }
};

export const getAllInfluencerAccounts = async (req, res, next) => {
  try {
    const allInfluencers = await Influencer.find(req.params.id);
    res.status(200).json(allInfluencers);
  } catch (error) {
    next(error);
  }
};

export const updateInfluencer = async (req, res, next) => {
  try {
    const influencerId = req.params.id;
    const updates = req.body;

    const influencer = await Influencer.findById(influencerId);
    const existingDeliverables = influencer.deliverable;

    if (updates.password) {
      // if password is being updated, hash it
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(updates.password, salt);
      updates.password = hash;
    }

    if (updates.username) {
      updates.username = updates.username.toLowerCase();
    }
    const displayNameExists = await Influencer.findOne({ displayName: updates.displayName });
    if (displayNameExists) {
      return res.status(400).json({ error: 'This display name already exists' });
    }
    const usernameExists = await Influencer.findOne({ username: updates.username });
    if (usernameExists) {
      return res.status(400).json({ error: 'This username already exists' });
    }

    const updatedDeliverables = updates.deliverable ? [...existingDeliverables, ...updates.deliverable] : existingDeliverables;

    if (!updatedDeliverables || !updatedDeliverables.length) {
      return res.status(400).json({ error: 'Deliverables array is empty' });
    }
    const invalidDeliverables = updatedDeliverables.filter((deliverable) => {
      return !deliverable.description || !deliverable.rate || !deliverable.deliveryTime;
    });
    if (invalidDeliverables.length) {
      return res.status(400).json({ error: 'One or more deliverables are incomplete' });
    }

    const options = { new: true }; // return the updated document
    const updateQuery = { $set: { ...updates, deliverable: updatedDeliverables } }; // merge existing deliverables with updates
    const updatedInfluencer = await Influencer.findByIdAndUpdate(
      influencerId,
      updateQuery,
      options
    );
    res.status(200).json(updatedInfluencer);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateBankInfo = async (req, res, next) => {
  try {
    const influencerId = req.params.id;
    const { bankAccountName, bankAccountNumber, bank } = req.body;
    const updates = {};

    if (bankAccountName) {
      updates.bankAccountName = bankAccountName;
    }

    if (bankAccountNumber) {
      updates.bankAccountNumber = bankAccountNumber;
    }

    if (bank) {
      updates.bank = bank;
    }

    const options = { new: true };
    const updateQuery = { $set: updates };
    const updatedBankInfo = await Influencer.findByIdAndUpdate(
      influencerId,
      updateQuery,
      options
    );
    res.status(200).json(updatedBankInfo);
  } catch (error) {
    next(error);
  }
};

export const deleteDeliverable = async (req, res, next) => {
  try {
    const influencerId = req.params.id;
    const deliverableId = req.params.deliverableId;

    const influencer = await Influencer.findById(influencerId);
    const updatedDeliverables = influencer.deliverable.filter((d) => d._id.toString() !== deliverableId);

    const options = { new: true }; // return the updated document
    const updateQuery = { $set: { deliverable: updatedDeliverables } }; // update the deliverables array
    const updatedInfluencer = await Influencer.findByIdAndUpdate(
      influencerId,
      updateQuery,
      options
    );

    if (!updatedInfluencer) {
      return res.status(404).json({ error: 'Influencer not found' });
    }

    res.status(200).json(updatedInfluencer);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getInfluencerProfiles = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.influencerId && { influencerId: q.influencerId }),
    ...(q.industry && { industry: q.industry }),
    ...((q.min || q.max) && {
      "deliverable.0.rate": {
        ...(q.min && { $gte: q.min }),
        ...(q.max && { $lte: q.max }),
      },
    }),
    ...(q.search && { username: { $regex: q.search, $options: "i" } }),
  };
  try {
    const getInfluencerProfiles = await Influencer.find(filters).sort({
      [q.sort]: -1,
    });
    res.status(200).send(getInfluencerProfiles);
  } catch (err) {
    next(err);
  }
};

export const getByBookingRate = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const byRates = await Influencer.find({
      ...others,
      "deliverable.0.rate": { $gt: min | 0, $lt: max || 9999999 },
    }).limit(req.query.limit);
    res.status(200).json(byRates);
  } catch (error) {
    next(error);
  }
};

export const getFeatured = async (req, res, next) => {
  const { featured } = req.query;
  try {
    const featuredInfluencers = await Influencer.find({
      isFeatured: featured === true
    }).limit(req.query.limit);
    res.status(200).json(featuredInfluencers);
  } catch (error) {
    next(error);
  }
};

export const countByIndustry = async (req, res, next) => {
  try {
    const artCount = await Influencer.countDocuments({ industry: "art" });
    const beautyCount = await Influencer.countDocuments({ industry: "beauty" });
    const blockchainCount = await Influencer.countDocuments({
      industry: "blockchain",
    });
    const businessCount = await Influencer.countDocuments({
      industry: "business",
    });
    const danceCount = await Influencer.countDocuments({ industry: "dance" });
    const fashionCount = await Influencer.countDocuments({
      industry: "fashion",
    });
    const financeCount = await Influencer.countDocuments({
      industry: "finance",
    });
    const foodCount = await Influencer.countDocuments({ industry: "food" });
    const gamingCount = await Influencer.countDocuments({ industry: "gaming" });
    const healthCount = await Influencer.countDocuments({ industry: "health" });
    const lifestyleCount = await Influencer.countDocuments({
      industry: "lifestyle",
    });
    const photographyCount = await Influencer.countDocuments({
      industry: "photography",
    });
    const realEstateCount = await Influencer.countDocuments({
      industry: "real estate",
    });
    const skitsCount = await Influencer.countDocuments({
      industry: "skits",
    });
    const storytellingCount = await Influencer.countDocuments({
      industry: "storytelling",
    });
    const sportsCount = await Influencer.countDocuments({ industry: "sports" });
    const techCount = await Influencer.countDocuments({ industry: "tech" });
    const travelCount = await Influencer.countDocuments({ industry: "travel" });

    res.status(200).json([
      { industry: "art", count: artCount },
      { industry: "beauty", count: beautyCount },
      { industry: "blockchain", count: blockchainCount },
      { industry: "business", count: businessCount },
      { industry: "dance", count: danceCount },
      { industry: "fashion", count: fashionCount },
      { industry: "finance", count: financeCount },
      { industry: "food", count: foodCount },
      { industry: "gaming", count: gamingCount },
      { industry: "health", count: healthCount },
      { industry: "lifestyle", count: lifestyleCount },
      { industry: "photography", count: photographyCount },
      { industry: "real estate", count: realEstateCount },
      { industry: "skits", count: skitsCount },
      { industry: "storytelling", count: storytellingCount },
      { industry: "sports", count: sportsCount },
      { industry: "tech", count: techCount },
      { industry: "travel", count: travelCount },
    ]);
  } catch (error) {
    next(error);
  }
};
