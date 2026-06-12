const express = require("express");
const router = express.Router();

const MealTiming =
require("../models/MealTiming");

// CREATE
router.post("/save", async (req, res) => {

    try {

        const data =
            await MealTiming.create(
                req.body
            );

        res.status(201).json(data);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

// READ ALL
router.get("/all", async (req, res) => {

    try {

        const data =
            await MealTiming.find();

        res.json(data);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

// READ BY ID
router.get("/:id", async (req, res) => {

    try {

        const data =
            await MealTiming.findById(
                req.params.id
            );

        res.json(data);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

// UPDATE
router.put("/:id", async (req, res) => {

    try {

        const data =
            await MealTiming.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true
                }
            );

        res.json(data);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

// DELETE
router.delete("/:id", async (req, res) => {

    try {

        await MealTiming.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message:
            "Deleted Successfully"
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

module.exports = router;