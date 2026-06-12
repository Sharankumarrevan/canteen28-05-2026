const mongoose = require("mongoose");

const mealDetailsSchema =
new mongoose.Schema({

    canteenId: String,

    mealTitle: String,

    fromTime: String,

    toTime: String,

    rate: Number,

    subsidyPercentage: Number,

    mealsServed: String

}, {
    timestamps: true
});

module.exports =
mongoose.model(
    "MealDetails",
    mealDetailsSchema,
    "canteen_meals_details"
);