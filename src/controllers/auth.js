import { createUser } from "../services/auth.js";

export const registerUser = async(req, res, next) => {
    const user = await createUser(req.body);

    res.json({
        status: 201,
        message: 'Successfully registered a user!',
        data: user
    });
};
