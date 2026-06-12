console.log("SERVER STARTING...");


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname));

mongoose.connect(
  "mongodb://127.0.0.1:27017/canteen_db"
)
.then(() => {
  console.log("MongoDB Connected");
})
.catch(err => {
  console.log(err);
});

app.use(
  "/api/canteen",
  require("./routes/canteenRoutes")
);
app.use(
  "/api/meal-details",
  require("./routes/mealDetailsRoutes")
);
// app.use(
//   "/api/meal-timing",
//   require("./routes/mealTimingRoutes")
// );
// app.use(
//   "/api/employee-consumption",
//   require("./routes/employeeConsumptionRoutes")
// );
// app.use(
//   "/api/special-days",
//   require("./routes/specialDayRoutes")
// );
app.listen(5000, () => {
  console.log(
    "Server Running On Port 5000"
  );
});