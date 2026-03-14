import { Router } from "express";
import { getMe, login, register } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/get-me", getMe);

export default authRouter;