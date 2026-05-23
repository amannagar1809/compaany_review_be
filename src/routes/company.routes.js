const express = require("express");

const {
  createCompany,
  getCompanies,
  getCompanyById,
} = require("../controllers/company.controller");

const router = express.Router();

router.post("/", createCompany);

router.get("/", getCompanies);

router.get("/:id", getCompanyById);

module.exports = router;