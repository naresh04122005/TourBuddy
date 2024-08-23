const Joi = require("joi");

const placeSchemaValidator = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  image: Joi.string(),
  imageId: Joi.string(),
  addedBy: Joi.string().optional(),  // This field is optional in the schema
  reviews: Joi.array().items(Joi.string()).optional()  // This field is optional in the schema
});

const reviewSchemaValidator = Joi.object({
  rating: Joi.number().min(1).max(5).required(),
  review: Joi.string().required(),
});

module.exports = { placeSchemaValidator, reviewSchemaValidator };
