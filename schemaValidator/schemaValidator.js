const Joi = require("joi");

const placeSchemaValidator = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  location: Joi.string().required(),
});

const reviewSchemaValidator = Joi.object({
  rating: Joi.number().min(1).max(5).required(),
  review: Joi.string().required(),
});

module.exports = { placeSchemaValidator, reviewSchemaValidator };
