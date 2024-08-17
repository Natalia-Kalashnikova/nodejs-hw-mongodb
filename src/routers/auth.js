import { Router } from "express";
import { ctrWrapper } from "../utils/ctrlWrapper.js";
import {
    loginUserController,
    logoutController,
    refreshTokenController,
    registerUserController
} from "../controllers/auth.js";
import { registerUserSchema } from "../validation/registerUserSchema.js";
import { validateBody } from "../middlewares/validateBody.js";
import { loginUserSchema } from "../validation/loginSchemaValidator.js";

const authRouter = Router();

authRouter.post(
    '/register',
    validateBody(registerUserSchema),
    ctrWrapper(registerUserController),
);
authRouter.post(
    '/login',
    validateBody(loginUserSchema),
    ctrWrapper(loginUserController),
);
authRouter.post(
    '/refresh-token',
    ctrWrapper(refreshTokenController),
);
authRouter.post(
    '/logout',
    ctrWrapper(logoutController),
);


export default authRouter;
