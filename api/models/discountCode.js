import mongoose from "mongoose";

const { Schema } = mongoose;

const DiscountCodeSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    used: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    expiryAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // set to 5 days from now
    },
  },
  {
    timestamps: true,
  }
);

// Define function to generate a unique discount code
async function generateDiscountCode() {
  let discountCode;
  let discountExists = true;

  // Loop until a unique discount code is generated
  while (discountExists) {
    discountCode = Math.random().toString(36).substr(2, 8).toUpperCase();
    const existingDiscount = await DiscountCode.findOne({ code: discountCode });
    if (!existingDiscount) {
      discountExists = false;
    }
  }

  return discountCode;
}

// Define function to create discount codes
async function createDiscountCodes(numCodes) {
  try {
    // Check if there are any existing discount codes in the database
    const existingDiscounts = await DiscountCode.countDocuments();
    if (existingDiscounts > 0) {
      console.log(`Discount codes already exist in database, not creating new ones`);
      return;
    }

    // Generate and save new discount codes
    const discountCodes = [];
    for (let i = 0; i < numCodes; i++) {
      const code = await generateDiscountCode();
      const discount = new DiscountCode({ code });
      await discount.save();
      console.log(`Discount code ${code} created successfully`);
      discountCodes.push(discount);
    }
    console.log(`All ${numCodes} discount codes created successfully`);
    return discountCodes;
  } catch (error) {
    console.error(error);
  }
}

// Define DiscountCode model
const DiscountCode = mongoose.model("DiscountCode", DiscountCodeSchema);

// Export DiscountCode model
export default DiscountCode;

// Call createDiscountCodes function to create new discount codes if none exist in the database
createDiscountCodes(10);