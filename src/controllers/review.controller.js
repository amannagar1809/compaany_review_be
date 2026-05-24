const Review = require("../models/Review");
const Company = require("../models/Company");
exports.addReview = async (req, res, next) => {
  try {
    const review = await Review.create(req.body);
    console.log("Review created:", review);
    // Calculate average rating
    // const stats = await Review.aggregate([
    //   {
    //     $match: {
    //       companyId: review.companyId,
    //     },
    //   },
    //   console.log("Matching reviews for company:", review.companyId),
    //   {
    //     $group: {
    //       _id: `$companyId`,
    //       averageRating: { $avg: `$rating`, },
    //       totalReviews: { $sum: 1, },
    //     },
    //   },
    //   console.log("Aggregated stats"),
    // ]);
    // console.log("Rating stats:", stats);

    // if (stats.length > 0) {
    //   await Company.findByIdAndUpdate(
    //     review.companyId,
    //     {
    //       avgRating: Number(
    //         stats[0].averageRating.toFixed(1)
    //       ),
    //       totalReviews: stats[0].totalReviews,
    //     }
    //   );
    // }

    const company = await Company.findById(review.companyId);

    const totalReviews = company.totalReviews + 1;

    const totalRating = (company.totalRating || 0) + review.rating;

    const avgRating = Number((totalRating / totalReviews).toFixed(1));
    console.log("Updating company with new rating stats:", {
      totalReviews,
      totalRating,
      avgRating,
    });
    await Company.findByIdAndUpdate(
      review?.companyId,

      {
        totalReviews,
        totalRating,
        avgRating,
      },
    );

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
      { new: true },
    );

    res.json({
      success: true,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};
