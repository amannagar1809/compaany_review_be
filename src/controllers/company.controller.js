const Company = require("../models/Company");

exports.createCompany = async (req, res, next) => {
  // try {
  //   const company = await Company.create(req.body);

  //   res.status(201).json({
  //     success: true,
  //     data: company,
  //   });
    try {

    const company =
      await Company.create({

        companyName:
          req.body.companyName,

        location:
          req.body.location,

        city:
          req.body.city,

        foundedOn:
          req.body.foundedOn,

        description:
          req.body.description,

        logo:
          req.file
            ? req.file.path
            : "",

      });

    res.status(201).json({
      success: true,
      data: company,
    });
  } catch (error) {
    next(error);
  }
};

exports.getCompanies = async (req, res) => {
  try {
    const {
      search,
      city,
      sort,
    } = req.query;

    let query = {};

    // Search
    if (search) {
      query.companyName = {
        $regex: search,
        $options: "i",
      };
    }

    // City Filter
    if (city) {
      query.city = city;
    }

    let sortOption = {};

    switch (sort) {
      case "rating":
        sortOption = {
          avgRating: -1,
        };
        break;

      case "newest":
        sortOption = {
          createdAt: -1,
        };
        break;

      case "name":
      default:
        sortOption = {
          companyName: 1,
        };
    }

    const companies =
      await Company.find(query)
        .sort(sortOption);

    res.status(200).json({
      success: true,
      data: companies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCompanyById = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);

    res.json({
      success: true,
      data: company,
    });
  } catch (error) {
    next(error);
  }
};

