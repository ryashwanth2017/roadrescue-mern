const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    vehicleType: {
      type: String,
      required: true,
      enum: ["Bike", "Car", "Truck", "Bus", "Van", "Other"],
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    model: {
      type: String,
      required: true,
      trim: true,
    },

    color: {
      type: String,
      trim: true,
    },

    year: {
      type: Number,
    },

    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "Electric", "CNG", "Hybrid"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);