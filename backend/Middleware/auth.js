import jwt from 'jsonwebtoken'
import { User } from "../Models/User.js";
export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    if (!req.user) {
      return res.status(401).json({ error: "User not found" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ error: "Not authenticated" });
  }
};


