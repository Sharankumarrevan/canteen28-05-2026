const express = require("express");
const router = express.Router();

const Canteen = require("../models/Canteen");
console.log(Canteen);

// =====================
// CREATE
// =====================
router.post("/save", async (req, res) => {

    console.log("SAVE API HIT");

    try {

        const data =
            await Canteen.create(
                req.body
            );

        console.log(data);

        res.status(201).json(data);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            error: err.message
        });

    }

});
// =====================
// READ ALL
// =====================
router.get(
    "/all",
    async (req, res) => {

        try {

            const data =
                await Canteen.find();

            res.json(data);

        } catch (err) {

            res.status(500).json({
                error: err.message
            });

        }

    }
);

// =====================
// READ BY ID
// =====================
router.get(
    "/:id",
    async (req, res) => {

        try {

            const data =
                await Canteen.findById(
                    req.params.id
                );

            res.json(data);

        } catch (err) {

            res.status(500).json({
                error: err.message
            });

        }

    }
);

// =====================
// UPDATE
// =====================
router.put(
    "/:id",
    async (req, res) => {

        try {

            const data =
                await Canteen.findByIdAndUpdate(
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

    }
);

// =====================
// DELETE
// =====================
router.delete(
    "/:id",
    async (req, res) => {

        try {

            await Canteen.findByIdAndDelete(
                req.params.id
            );

            res.json({
                message: "Deleted Successfully"
            });

        } catch (err) {

            res.status(500).json({
                error: err.message
            });

        }

    }
);

module.exports = router;