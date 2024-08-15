import { Router } from "express";
import { ctrWrapper } from "../utils/ctrlWrapper.js";
import { registerUser } from "../controllers/auth.js";
import { registerUserSchema } from "../validation/registerUserSchema.js";
import { validateBody } from "../middlewares/validateBody.js";

const authRouter = Router();

authRouter.post(
    '/register',
    validateBody(registerUserSchema),
    ctrWrapper(registerUser)
);
authRouter.post('/login');
authRouter.post('/refresh-token');
authRouter.post('/logout');


export default authRouter;
