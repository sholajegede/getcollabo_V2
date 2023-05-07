import Brand from "../models/brand.js";
import createError from "../utils/createError.js";

export const deleteBrand = async (req, res, next) => {
  const brand = await Brand.findById(req.params.id);

  if (req.brandId !== brand._id.toString()) {
    return next(createError(403, "You can delete only your account!"));
  }
  await Brand.findByIdAndDelete(req.params.id);
  res.status(200).send("Your brand account has been deleted!");
};

export const getBrand = async (req, res, next) => {
  try {
    const brand = await Brand.findById(req.params.id);
    res.status(200).json(brand);
  } catch (error) {
    next(error);
  }
};

export const getBrandByEmail = async (req, res, next) => {
  try {
    const brand = await Brand.findOne({
      email: req.params.email,
    });
    res.status(200).json(brand);
  } catch (error) {
    next(error);
  }
};

export const getAllBrandAccounts = async (req, res, next) => {
  try {
    const allBrands = await Brand.find(req.params.id);
    res.status(200).json(allBrands);
  } catch (error) {
    next(error);
  }
};

export const updateBrand = async (req, res, next) => {
  try {
    const brandId = req.params.id;
    const updates = req.body;

    if (updates.password) {
      // if password is being updated, hash it
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(updates.password, salt);
      updates.password = hash;
    }

    const options = { new: true }; // return the updated document
    const updateQuery = { $set: updates }; // wrap updates in $set operator
    const updatedBrand = await Brand.findByIdAndUpdate(
      brandId,
      updateQuery,
      options
    );
    res.status(200).json(updatedBrand);
  } catch (error) {
    next(error);
  }
};

