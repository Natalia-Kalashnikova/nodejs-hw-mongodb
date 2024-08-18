import { REFRESH_TOKEN_TTL } from "../constants/index.js";
import {
    createUser,
    loginUser,
    logoutUser,
    refreshSession
} from "../services/auth.js";


const setupSessionCookies = (res, session) => {
    res.cookie('sessionId', session._id, {
    httpOnly: true,
    expire: REFRESH_TOKEN_TTL,
    });
    res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expire: REFRESH_TOKEN_TTL,
    });
};

export const registerUserController = async(req, res) => {
    const user = await createUser(req.body);

    res.status(201).json({
        status: 201,
        message: 'Successfully registered a user!',
        data: user
    });
};

export const loginUserController = async(req, res) => {
    const session = await loginUser(req.body);

    setupSessionCookies(res, session);

    res.status(200).json({
        status: 200,
        message: 'Successfully logged in an user!',
        data: {accessToken: session.accessToken},
    });
};

export const refreshTokenController = async(req, res) => {
    const { sessionId, refreshToken  } = req.cookies;
    const session = await refreshSession({ sessionId, refreshToken });

    setupSessionCookies(res, session);

    res.json({
        status: 200,
        message: 'Successfully refreshed a session!',
        data: {accessToken: session.accessToken},
    });
};

export const logoutController = async (req, res) => {
    await logoutUser({
        sessionId: req.cookies.sessionId,
        refreshToken: req.cookies.refreshToken,
    });

    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');

    res.status(204).send();
};
