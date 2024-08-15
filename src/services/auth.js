import { User } from "../db/models/user.js";
import bcrypt from 'bcrypt';

export const createUser = async (payload) => {
    const hashedPassword = await bcrypt.hash(payload.password, 10);

    return await User.create({
        ...payload,
        password: hashedPassword,
    });
};
