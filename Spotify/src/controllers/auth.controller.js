import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const register = async (req, res) => {
  const { email, password, userType } = req.body;
  const user = await User.create({ email, password, userType });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      userType: user.userType,
    },
    config.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60,
  });

  res.status(201).json({ message: "User registered successfully", user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

};

export const getMe = async (req, res) => {
  const { token } = req.cookies;

  const decoded = jwt.verify(token, config.JWT_SECRET);

  const user = await User.findById(decoded.id);
  
  res.status(200).json({ decoded });
};
