const APIError = require('../utils/apiErrors');
const chalk = require('chalk');

const { sqlQuarryHelper } = require('../utils/helper');

module.exports = {
  getAllProducts: async (req, res, next) => {
    const sql = 'SELECT * FROM `products` WHERE isDeleted=0';

    // make SQL quarry
    const [products, error] = await sqlQuarryHelper(sql);

    if (error) return next(error);

    res.json(products);
  },

  getSingleProduct: async (req, res, next) => {
    const { prodId } = req.params;

    const sql = 'SELECT * FROM `products` WHERE id=?';
    // make SQL quarry
    const [product, error] = await sqlQuarryHelper(sql, [prodId]);

    if (error) {
      console.log(chalk.bgRed.whiteBright('getSingleProduct error ==='));
      return next(error);
    }

    if (product.length === 0) {
      return next(new APIError('Product not found', 404));
    }
    res.json(product[0]);
  },
};
