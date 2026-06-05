const mongoose = require("mongoose");

const canteenSchema = new mongoose.Schema({

    organization: Object,
    subsidiary: Object,
    location: Object,

    mealDetails: Object,
    mealTimings: Object,
    subsidy: Object,
    employeeConsumption: Object,
    specialDays: Object

}, {
    timestamps: true
});

module.exports =
mongoose.model(
    "Canteen",
    canteenSchema
);