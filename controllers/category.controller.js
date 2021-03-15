/* eslint-disable prettier/prettier */
const Category = require('../models/category.model');

module.exports = {
  create: async (req, res) => {
    const { categoryName } = req.body;
    categoryNameExist = await Category.findOne({ where: { categoryName } });
    if (categoryNameExist) return res.json({ userError: 'This category name is exist!' });
    cat = { categoryName };
    if (req.file) cat = { categoryName, categoryImg: req.file.filename };

    await Category.create(cat)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || '500: Some error occured while creating user.',
        });
      });
  },

  getCategories: async (req, res) => {
    await Category.findAll()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || '500: Some error occured while fetching users.',
        });
      });
  },
};
