const express = require("express");

const {
  addReview,
  getReviewsByCompany,
  likeReview,
} = require("../controllers/review.controller");

const router = express.Router();

router.post("/", addReview);

router.get("/company/:companyId", getReviewsByCompany);

router.patch("/:id/like", likeReview);

module.exports = router;