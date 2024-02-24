const chalk = require('chalk');
const APIError = require('../utils/apiErrors');
const { sqlQuarryHelper } = require('../utils/helpers');

module.exports = {
  getCategories: async (req, res, next) => {
    const sql = 'SELECT * FROM `categories`';

    // make SQL quarry
    const [categories, error] = await sqlQuarryHelper(sql);

    if (error) return next(error);

    res.json(categories);
  },

  getAllSubCategories: async (req, res, next) => {
    const sql = 'SELECT * FROM `sub_categories`';
    // make SQL quarry
    const [subCategories, error] = await sqlQuarryHelper(sql);

    if (error) {
      console.log(chalk.bgRed.whiteBright('getSubCategories error ==='));
      return next(error);
    }

    if (subCategories.length === 0) {
      return next(new APIError('SubCategories not found', 404));
    }

    res.json(subCategories);
  },

  getSubCategory: async (req, res, next) => {
    const { catID } = req.params;

    const sql = 'SELECT * FROM `sub_categories` WHERE parent_id=?';
    // make SQL quarry
    const [subCategories, error] = await sqlQuarryHelper(sql, [catID]);

    if (error) {
      console.log(chalk.bgRed.whiteBright('getSubCategories error ==='));
      return next(error);
    }

    if (subCategories.length === 0) {
      return next(new APIError('SubCategories not found', 404));
    }

    res.json(subCategories);
  },
};
