const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        vehicleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle",
            required: true
        },

        mechanicId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        serviceType: {
            type: String,
            enum: [
                "Breakdown Repair",
                "Towing",
                "Battery Jump Start",
                "Flat Tire",
                "Fuel Delivery",
                "Lockout"
            ],
            required: true
        },

        location: {
            address: {
                type: String,
                required: true
            },
            latitude: Number,
            longitude: Number
        },

        description: {
            type: String,
            trim: true
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Accepted",
                "On The Way",
                "Reached",
                "Repair Started",
                "Completed",
                "Cancelled"
            ],
            default: "Pending"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);