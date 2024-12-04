import bcrypt from "bcryptjs";
import { User } from "../Models/User.js";
import { generateTokenAndSaveInCookies } from "../jwt/token.js";

export const SignUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ msg: "Please fill all fields" });
    }
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });
    const hasshedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hasshedPassword });
    await newUser.save();
    const token = await generateTokenAndSaveInCookies(newUser._id, res);
    res.json({ message: "User registered successfully", token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ msg: "Please fill all fields" });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
    const token = await generateTokenAndSaveInCookies(user._id, res);
    res.json({ message: "User logged in successfully", token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    path: "/",
  });
  res.json({ msg: "User logged out successfully" });
};
