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

exports.getCompanies = async (req, res, next) => {
  try {
    const companies = await Company.find();

    res.json({
      success: true,
      count: companies.length,
      data: companies,
    });
  } catch (error) {
    next(error);
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