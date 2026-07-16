const express = require("express");
const auth = require("../middleware/auth");
const Vehicle = require("../models/Vehicle");
const ServiceRequest = require("../models/ServiceRequest");

const router = express.Router();


//Create Service Request
router.post("/", auth, async (req, res) => {
    try {

        const {
            vehicleId,
            serviceType,
            address,
            latitude,
            longitude,
            description
        } = req.body;

        // Check if vehicle belongs to logged-in user
        const vehicle = await Vehicle.findOne({
            _id: vehicleId,
            userId: req.user.id
        });

        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle not found"
            });
        }

        const request = await ServiceRequest.create({

            userId: req.user.id,

            vehicleId,

            serviceType,

            location: {
                address,
                latitude,
                longitude
            },

            description

        });

        res.status(201).json({
            message: "Roadside Assistance Requested Successfully",
            request
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});

//Get My Requests
router.get("/", auth, async (req, res) => {
    try {

        const requests = await ServiceRequest.find({
            userId: req.user.id
        })
        .populate("vehicleId")
        .sort({ createdAt: -1 });

        res.json(requests);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});
//Get Request By Id
router.get("/:id", auth, async (req, res) => {

    try {

        const request = await ServiceRequest.findOne({

            _id: req.params.id,
            userId: req.user.id

        }).populate("vehicleId");

        if (!request) {

            return res.status(404).json({

                message: "Request not found"

            });

        }

        res.json(request);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});

//Cancel Request
router.put("/cancel/:id", auth, async (req, res) => {

    try {

        const request = await ServiceRequest.findOne({

            _id: req.params.id,
            userId: req.user.id

        });

        if (!request) {

            return res.status(404).json({

                message: "Request not found"

            });

        }

        if (request.status !== "Pending") {

            return res.status(400).json({

                message: "Request cannot be cancelled"

            });

        }

        request.status = "Cancelled";

        await request.save();

        res.json({

            message: "Request Cancelled Successfully",
            request

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

});
module.exports = router;

