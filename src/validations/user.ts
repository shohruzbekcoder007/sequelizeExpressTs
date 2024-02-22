import Joi from "joi";

export const createUserValidator = (user: object) => {
    const schema = Joi.object({
        firstName: Joi.string().min(5).max(255).required(),
        lastName: Joi.string().min(5).max(255).required(),
        middleName: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        address: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(user);
}

export const loginValidator = (user: object) => {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(user);
}