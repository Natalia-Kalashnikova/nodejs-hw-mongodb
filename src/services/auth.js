import createHttpError from "http-errors";
import { User } from "../db/models/user.js";
import bcrypt from 'bcrypt';
import crypto from "crypto";
import { SessionsCollection } from "../db/models/session.js";
import { ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL } from "../constants/index.js";

const createSession = () => {

    return {
        accessToken: crypto.randomBytes(30).toString('base64'),
        refreshToken: crypto.randomBytes(30).toString('base64'),
        accessTokenValidUntil: Date.now() + ACCESS_TOKEN_TTL,
        refreshTokenValidUntil: Date.now() + REFRESH_TOKEN_TTL,
    };
};


export const createUser = async (payload) => {
    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const user = await User.findOne({ email: payload.email });

    if (user) {
        throw createHttpError(409, 'Email in use');
    }

    return await User.create({
        ...payload,
        password: hashedPassword,
    });
};


export const loginUser = async ({email, password}) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw createHttpError(404, 'User not found');
    }
    const areEqual = await bcrypt.compare(password, user.password);

    if (!areEqual) {
        throw createHttpError(401, 'Unauthorized');
    }

    await SessionsCollection.deleteOne({ userId: user._id });

       return await SessionsCollection.create({
           userId: user._id,
           ...createSession(),
    });
};

export const logoutUser = async({sessionId, sessionToken}) => {
    return await SessionsCollection.deleteOne({
        _id: sessionId,
        refreshToken: sessionToken,
    });
};

export const refreshSession = async ({ sessionId, sessionToken }) => {
    const session = await SessionsCollection.findOne({
        _id: sessionId,
        refreshToken: sessionToken,
    });

    if (!session) {
        throw createHttpError(401, 'Session not found!');
    }

    if (new Date() > session.refreshTokenValidUntil) {
        throw createHttpError(401, 'Refresh token is expired!');
    }

    const user = await User.findById(session.userId);

    if (!user) {
        throw createHttpError(401, 'Session not found!');
    }

    await SessionsCollection.deleteOne({ _id: sessionId });

        return await SessionsCollection.create({
        userId: user._id,
        ...createSession(),
    });
};
