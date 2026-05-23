const Review = require("../models/Review");

exports.addReview = async (req, res, next) => {
  try {
    const review = await Review.create(req.body);

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

exports.getReviewsByCompany = async (req, res, next) => {
  try {
    const reviews = await Review.find({
      companyId: req.params.companyId,
    });

    res.json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

exports.likeReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { likes: 1 },
      },
      { new: true }
    );

    res.json({
      success: true,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};