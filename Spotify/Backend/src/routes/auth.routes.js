import { Router } from "express";
import { getMe, login, register, logout } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.get("/get-me", getMe);

authRouter.post("/logout", logout);

export default authRouter;
