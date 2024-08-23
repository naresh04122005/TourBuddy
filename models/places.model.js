const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cloudinary = require("../config/cloudConfig");

const placeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    imageId: {
      type: String,  
      required: true,
    },
    addedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Place", placeSchema);
