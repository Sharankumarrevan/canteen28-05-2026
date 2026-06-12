const mongoose = require("mongoose");

const canteenSchema = new mongoose.Schema({

    organization: {
        organizationCode: String,
        organizationName: String
    },

    subsidiary: {
        subsidiaryCode: String,
        subsidiaryName: String
    },

    location: {
        locationCode: String,
        locationName: String
    }

}, {
    timestamps: true
});

module.exports =
mongoose.model(
    "Canteen",
    canteenSchema
);