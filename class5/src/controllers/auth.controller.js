import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export async function register(req, res) {
    const { email, password } = req.body;

    const user = await userModel.create({
        email, password
    })

    const token = jwt.sign(
        {
            email: user.email,
            id: user._id,
        },
        config.JWT_SECRET
    )

    res.status(201).json({
        message: "User registered successfully",
        token: token
    });
}

export async function getMe(req, res) {
    const { token } = req.body;

    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    res.status(200).json({
        message: "User fetched successfully",
        user
    });
}