import createHttpError from "http-errors";
import { User } from "../db/models/user.js";
import bcrypt from 'bcrypt';
import crypto from "crypto";
import { SessionsCollection } from "../db/models/session.js";
import { ACCESS_TOKEN_TTL, ENV_VARS, REFRESH_TOKEN_TTL, TEMPLATE_DIR } from "../constants/index.js";
import {env} from "../utils/env.js";
import jwt from 'jsonwebtoken';
import handlebars from 'handlebars';
import fs from 'node:fs/promises';
import path from 'node:path';
import { sendMail } from "../utils/sendMail.js";


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


export const logoutUser = async({sessionId, refreshToken}) => {
    return await SessionsCollection.deleteOne({
        _id: sessionId,
        refreshToken: refreshToken,
    });
};

export const refreshSession = async ({ sessionId, refreshToken }) => {
    const session = await SessionsCollection.findOne({
        _id: sessionId,
        refreshToken: refreshToken,
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


export const sendResetPassword = async (email) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw createHttpError(404, 'User not found!');
    }
    const token = jwt.sign(
      {
        sub: user.id,
        email,
      },
      env(ENV_VARS.JWT_SECRET),
      {
        expiresIn: '5m',
      },
    );

       const templateSource = await fs.readFile(
    path.join(TEMPLATE_DIR, 'reset-password-email.html'),

  );

  const template = handlebars.compile(templateSource.toString());

  const html = template({
    name: user.name,
    link: `${env(ENV_VARS.APP_DOMAIN)}/reset-password?token=${token}`,
  });

    try {
      await sendMail({
        html,
        to: email,
        from: env(ENV_VARS.SMTP_FROM),
        subject: 'Reset your password',
      });
    } catch (err) {
      console.log(err);

      throw createHttpError(500, 'Failed to send the email, please try again later.');
    }
  };


export const resetPassword = async ({ token, password }) => {
  let tokenPayload;
  try {
    tokenPayload = jwt.verify(token, env(ENV_VARS.JWT_SECRET));
  } catch (err) {
      console.log(err);
    throw createHttpError(401, 'Token is expired or invalid');
  }

  const user = await User.findOne({
      email: tokenPayload.email,
      _id: tokenPayload.sub,
    });

    if (!user) {
      throw createHttpError(404, 'User not found!');
    }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.findOneAndUpdate(
    {
      _id: tokenPayload.sub,
      email: tokenPayload.email,
    },
    { password: hashedPassword },
  );

  await SessionsCollection.deleteOne({ userId: user._id });
};
