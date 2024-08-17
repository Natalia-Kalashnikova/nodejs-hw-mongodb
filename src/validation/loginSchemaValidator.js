import Joi from 'joi';


export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(12).required(),
});