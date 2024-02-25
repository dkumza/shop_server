const chalk = require('chalk');
const { sqlQuarryHelper } = require('../utils/helpers');

module.exports = {
  getAllCities: async (req, res, next) => {
    const sql = 'SELECT * FROM `cities`';
    const [cities, error] = await sqlQuarryHelper(sql);

    if (error) return next(error);

    res.json(cities);
  },
};
