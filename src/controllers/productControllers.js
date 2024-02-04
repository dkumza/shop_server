// eslint-disable-next-line import/no-extraneous-dependencies
const chalk = require('chalk');
const APIError = require('../utils/apiErrors');
const { sqlQuarryHelper } = require('../utils/helpers');
const { deleteFile } = require('../middleware/upload');

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

    console.log(chalk.bgGreen.whiteBright('product ==='), product);
    res.json(product);
  },

  createProduct: async (req, res, next) => {
    const { title, description, price, cat_id } = req.body;
    const { userID } = req;
    const img_url = req.file.path;

    if (userID !== 1) {
      // if not "admin"
      deleteFile(img_url);
      return next(new APIError('Unauthorized', 400));
    }

    const prodData = [title, description, price, cat_id, img_url];
    const sql = `INSERT INTO products (title, description, price, cat_id, img_url) 
    
    VALUES (?,?,?,?,?)`;

    const [product, error] = await sqlQuarryHelper(sql, prodData);

    if (error) {
      console.log(chalk.bgRed.whiteBright('error ==='), error);
      // Delete the uploaded file

      deleteFile(img_url);
      return next(error);
    }

    if (product.affectedRows !== 1) {
      console.log(chalk.bgRed.whiteBright('product ==='), product);
      // Delete the uploaded file
      deleteFile(img_url);

      return next(new APIError('something went wrong', 400));
    }

    res.status(201).json({
      id: prodData.insertId,
      msg: 'New product created successfully',
    });
  },

  delete: async (req, res, next) => {
    const { prodId } = req.params;
    const { userID } = req;

    if (userID !== 1) {
      // if not "admin"
      return next(new APIError('Unauthorized', 400));
    }

    const sql = 'UPDATE `products` SET isDeleted=1 WHERE id=? LIMIT 1';
    const [product, error] = await sqlQuarryHelper(sql, [prodId]);
    if (error) {
      console.log(chalk.bgRed.whiteBright('delete item error ==='), error);
      return next(error);
    }

    if (product.affectedRows !== 1) {
      console.log(chalk.bgRed.whiteBright('delete product error: '), product);
      return next(new APIError('Something went wrong', 400));
    }

    res.status(200).json({
      msg: 'Product deleted successfully',
    });
  },
};
