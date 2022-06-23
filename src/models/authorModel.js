const mongoose = require("mongoose");


const authorSchema = new mongoose.Schema(
  { 
    fname: {
      type: String,
      required: true,
      trim: true, //remove space start and end point
    },
    lname: {
      type: String,
      required: true,
      trim: true, //remove space start and end point
    },
    title: {
      type: String,
      required: true,
      enum: ["Mr", "Mrs", "Miss"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true, //remove space start and end point
    },
    password: {
      type: String,
      required: true,
      trim: true, //remove space start and end point
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Author", authorSchema);
