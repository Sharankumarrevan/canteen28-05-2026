const mongoose = require("mongoose");

const specialDaySchema =
new mongoose.Schema({

    canteenId: String,

    title: String,

    date: String

}, {
    timestamps: true
});

module.exports =
mongoose.model(
    "SpecialDay",
    specialDaySchema,
    "special_days"
);