import express from 'express';
import { signup, signin, logout } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin); // Corrected from /sigin to /login
authRouter.get("/logout", logout);

export default authRouter;
