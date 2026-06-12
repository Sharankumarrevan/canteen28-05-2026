const mongoose = require("mongoose");

const mealTimingSchema =
new mongoose.Schema({

    canteenId: String,

    startTime: String,

    endTime: String

}, {
    timestamps: true
});

module.exports =
mongoose.model(
    "MealTiming",
    mealTimingSchema,
    "canteen_meals"
);