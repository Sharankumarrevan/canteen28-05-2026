const express = require("express");
const router = express.Router();

const MealDetails =
require("../models/MealDetails");

// CREATE
router.post("/save", async (req, res) => {

    try {

        console.log(
            "MEAL DETAILS RECEIVED:",
            req.body
        );

        const data =
        await MealDetails.create(
            req.body
        );

        console.log(
            "MEAL DETAILS SAVED:",
            data
        );

        res.status(201).json(data);

    }
    catch(err){

        console.log(
            "MEAL DETAILS ERROR:",
            err
        );

        res.status(500).json({
            error: err.message
        });

    }

});
// READ ALL
router.get("/all", async (req, res) => {

    try {

        const data =
            await MealDetails.find();

        res.json(data);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

// READ BY ID
// READ BY CANTEEN ID
router.get(
    "/by-canteen/:canteenId",
    async (req, res) => {

        try {

            const data =
                await MealDetails.findOne({
                    canteenId:
                    req.params.canteenId
                });

            res.json(data);

        }
        catch(err){

            res.status(500).json({
                error: err.message
            });

        }

    }
);

// UPDATE
router.put("/:id", async (req, res) => {

    try {

        const data =
            await MealDetails.findByIdAndUpdate(
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

        await MealDetails.findByIdAndDelete(
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