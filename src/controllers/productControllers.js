const { makeSqlQuarry } = require('../helpers/makeHelpers');

module.exports = {
  getAllProducts: async (req, res, next) => {
    const sql = 'SELECT * FROM `products` WHERE isDeleted=0';

    // make SQL quarry
    const [products, error] = await makeSqlQuarry(sql);

    if (error) {
      console.log('getAllProducts error ===');
      return next(error);
    }

    res.json(products);
  },
};
