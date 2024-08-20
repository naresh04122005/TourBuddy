const { placeSchemaValidator } = require("../schemaValidator/schemaValidator");

const validatePlace = (req, res, next) => {
  const { error } = placeSchemaValidator.validate(req.body);
  if (error) {
    throw new Error(error.details[0].message, 400);
  }
  next();
};

module.exports = { validatePlace };
