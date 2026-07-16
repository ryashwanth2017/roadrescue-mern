const express = require("express");
const Vehicle = require("../models/Vehicle");
const auth = require("../middleware/auth");

const router = express.Router();

/* ===========================
   Add Vehicle
=========================== */

router.post("/", auth, async (req, res) => {
    try {

        const {
            vehicleNumber,
            vehicleType,
            company,
            model,
            color,
            year,
            fuelType
        } = req.body;

        const existingVehicle = await Vehicle.findOne({ vehicleNumber });

        if (existingVehicle) {
            return res.status(400).json({
                message: "Vehicle already exists"
            });
        }

        const vehicle = await Vehicle.create({
            userId: req.user.id,
            vehicleNumber,
            vehicleType,
            company,
            model,
            color,
            year,
            fuelType
        });

        res.status(201).json({
            message: "Vehicle Added Successfully",
            vehicle
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

/* ===========================
   Get My Vehicles
=========================== */

router.get("/", auth, async (req, res) => {

    try {

        const vehicles = await Vehicle.find({
            userId: req.user.id
        });

        res.json(vehicles);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

/* ===========================
   Update Vehicle
=========================== */

router.put("/:id", auth, async (req, res) => {

    try {

        const vehicle = await Vehicle.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user.id
            },
            req.body,
            {
                new: true
            }
        );

        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle not found"
            });
        }

        res.json({
            message: "Vehicle Updated Successfully",
            vehicle
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

/* ===========================
   Delete Vehicle
=========================== */

router.delete("/:id", auth, async (req, res) => {

    try {

        const vehicle = await Vehicle.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle not found"
            });
        }

        res.json({
            message: "Vehicle Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;