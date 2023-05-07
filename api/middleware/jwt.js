import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return next(createError(401, "You are not logged in!"));

  jwt.verify(token, process.env.JWT_KEY, async (error, payload) => {
    if (error) return next(createError(403, "Token is not valid!"));
    req.brandId = payload.brandId;
    req.influencerId = payload.influencerId;

   
    res.cookie('accessToken', token, {
      maxAge: 3600 * 24 * 7, // 7 days
      httpOnly: true,
    });

    next();
  });
};
