const express = require("express");
const cors = require("cors");

const companyRoutes = require("./routes/company.routes");
const reviewRoutes = require("./routes/review.routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

app.use("/api/companies", companyRoutes);
app.use("/api/reviews", reviewRoutes);

app.use(errorHandler);

module.exports = app;