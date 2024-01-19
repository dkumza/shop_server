const chalk = require('chalk');
const APIError = require('../utils/apiErrors');
const { sqlQuarryHelper } = require('../utils/helpers');

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

    res.status(200).json({
      product: product[0],
      msg: 'Product fetched successfully',
    });
  },

  createProduct: async (req, res, next) => {
    const { title, description, price, rating, stock, cat_id } = req.body;

    console.log(chalk.bgRed.whiteBright('req.file.path ==='), req.file);
    const img_url = req.file.path;

    const prodData = [title, description, price, rating, stock, cat_id, img_url];
    const sql = `INSERT INTO products (title, description, price, rating, stock, cat_id, img_url) 
    VALUES (?,?,?,?,?,?,?)`;

    const [product, error] = await sqlQuarryHelper(sql, prodData);

    if (error) {
      console.log(chalk.bgRed.whiteBright('error ==='), error);
      return next(error);
    }

    if (product.affectedRows !== 1) {
      console.log(chalk.bgRed.whiteBright('product ==='), product);
      return next(new APIError('something went wrong', 400));
    }

    res.status(201).json({
      id: prodData.insertId,
      msg: 'New product created successfully',
    });
  },
};
