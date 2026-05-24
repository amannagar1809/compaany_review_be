const express = require("express");

const {
  createCompany,
  getCompanies,
  getCompanyById,
} = require("../controllers/company.controller");

const router = express.Router();

const upload = require(
  "../middlewares/upload"
);

router.post("/", upload.single("logo"), createCompany);

router.get("/", getCompanies);

router.get("/:id", getCompanyById);


module.exports = router;