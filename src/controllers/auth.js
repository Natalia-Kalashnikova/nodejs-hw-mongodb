import { REFRESH_TOKEN_TTL } from "../constants/index.js";
import {
    createUser,
    loginUser,
    logoutUser
} from "../services/auth.js";

export const registerUserController = async(req, res, next) => {
    const user = await createUser(req.body);

    res.json({
        status: 201,
        message: 'Successfully registered a user!',
        data: user
    });
};

export const loginUserController = async(req, res, next) => {
    const session = await loginUser(req.body);

    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expire: REFRESH_TOKEN_TTL,
    });
    res.cookie('sessionToken', session.refreshToken, {
        httpOnly: true,
        expire: REFRESH_TOKEN_TTL,
    });
    res.json({
        status: 200,
        message: 'Successfully logged in an user!',
        data: {assessToken: session.accessToken},
    });
};

export const logoutController = async (req, res, next) => {
    await logoutUser({
        sessionId: req.cookies.sessionId,
        sessionToken: req.cookies.sessionToken,
    });

    res.clearCookie('sessionId');
    res.clearCookie('sessionToken');

    res.status(204).send();
};
