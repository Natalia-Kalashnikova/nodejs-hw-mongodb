import createHttpError from "http-errors";
import { User } from "../db/models/user.js";
import bcrypt from 'bcrypt';
import crypto from "crypto";
import { SessionsCollection } from "../db/models/session.js";
import { ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL } from "../constants/index.js";


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

    const accessToken = crypto.randomBytes(30).toString('base64');
    const refreshToken = crypto.randomBytes(30).toString('base64');

       return await SessionsCollection.create({
        accessToken,
        refreshToken,
        userId: user._id,
        accessTokenValidUntil: Date.now() + ACCESS_TOKEN_TTL,
        refreshTokenValidUntil: Date.now() + REFRESH_TOKEN_TTL,
    });
};

export const logoutUser = async({sessionId, sessionToken}) => {
    return await SessionsCollection.deleteOne({
        _id: sessionId,
        refreshToken: sessionToken,
    });
};
