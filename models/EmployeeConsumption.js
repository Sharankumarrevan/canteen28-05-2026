const mongoose = require("mongoose");

const employeeSchema =
new mongoose.Schema({

    canteenId: String,

    dailyLimit: Number,

    allowGuest: String

}, {
    timestamps: true
});

module.exports =
mongoose.model(
    "EmployeeConsumption",
    employeeSchema,
    "employee_meals_consumption"
);