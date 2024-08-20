const Joi = require("joi");

const placeSchemaValidator = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  location: Joi.string().required(),
});

module.exports = { placeSchemaValidator };
