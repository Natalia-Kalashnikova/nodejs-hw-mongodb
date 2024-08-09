import Joi from "joi";


export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        'string.base': 'Username should be a string',
        'string.min': 'Username should have at least {#limit} characters',
        'string.max': 'Max string should have at most {#limit} characters',
        'any.required': 'Username is required',
    }),
    phoneNumber: Joi.string().min(3).max(20).required().messages({
        'string.base': 'User phone number should be a string',
        'string.min': 'User phone number should have at least {#limit} characters',
        'string.max': 'User phone number should have at most {#limit} characters',
        'any.required': 'User phone number is required',
    }),
    email: Joi.string().email(),
    isFavourite:Joi.boolean(),
    contactType: Joi.string().valid('work', 'home', 'personal').required(),
});
