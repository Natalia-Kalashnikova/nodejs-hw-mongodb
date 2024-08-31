import { Router } from "express";
import { ctrWrapper } from "../utils/ctrlWrapper.js";
import {
    loginUserController,
    logoutController,
    refreshTokenController,
    registerUserController,
    resetPasswordController,
    sendResetPasswordEmailController
} from "../controllers/auth.js";
import { registerUserSchema } from "../validation/registerUserSchema.js";
import { validateBody } from "../middlewares/validateBody.js";
import { loginUserSchema } from "../validation/loginSchemaValidator.js";
import { sendResetPasswordSchema } from "../validation/sendResetPasswordEmail.js";
import { resetPasswordSchema } from "../validation/resetPasswordSchema.js";


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
    '/refresh',
    ctrWrapper(refreshTokenController),
);

authRouter.post(
    '/logout',
    ctrWrapper(logoutController),
);

authRouter.post(
    '/send-reset-email',
    validateBody(sendResetPasswordSchema),
    ctrWrapper(sendResetPasswordEmailController),
  );

  authRouter.post(
    '/reset-pwd',
    validateBody(resetPasswordSchema),
    ctrWrapper(resetPasswordController),
  );

export default authRouter;
