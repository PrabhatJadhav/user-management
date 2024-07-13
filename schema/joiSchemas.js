const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.number().required(),
});

module.exports = { registerSchema, loginSchema };
