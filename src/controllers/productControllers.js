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
    const { title, description, price, cat_id, sub_id, city } = req.body;
    // const { userID } = req;

    const img_urls = req.files.map((file) => file.path);
    const img_urls_string = JSON.stringify(img_urls);
    console.log(chalk.bgRed.whiteBright('img_urls_string: '), img_urls_string);

    // console.log(chalk.bgRed.whiteBright('img_urls: '), img_urls);

    // if (userID !== 1) {
    //   // if not "admin"
    //   deleteFile(img_url);
    //   return next(new APIError('Unauthorized', 400));
    // }

    const prodData = [title, description, price, cat_id, sub_id, img_urls_string, city];
    console.log(chalk.bgRed.whiteBright('prodData: '), prodData);
    const sql = `INSERT INTO products (title, description, price, cat_id, sub_id, img_urls, city)
    VALUES (?,?,?,?,?,?,?)`;

    const [product, error] = await sqlQuarryHelper(sql, prodData);

    // ! create delete file if sql fails

    if (error) {
      console.log(chalk.bgRed.whiteBright('error ==='), error);
      // Delete the uploaded file
      // deleteFile(img_urls);
      return next(error);
    }

    if (product.affectedRows !== 1) {
      console.log(chalk.bgRed.whiteBright('product ==='), product);
      // Delete the uploaded file
      // deleteFile(img_urls);

      return next(new APIError('something went wrong', 400));
    }

    res.status(201).json({
      id: prodData.insertId,
      msg: 'Successfully Created',
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

  edit: async (req, res, next) => {
    const { userID } = req;
    const img_url = req.file.path;

    if (userID !== 1) {
      // if not "admin"
      deleteFile(img_url);
      return next(new APIError('Unauthorized', 400));
    }

    const updatedDate = new Date();
    console.log(updatedDate);
    const { prodId } = req.params;
    const { title, description, cat_id, price, city, lastImgUrl } = req.body;

    const prodData = [title, description, cat_id, price, city, img_url, updatedDate];
    // console.log(chalk.bgGreen.whiteBright('prodData: '), prodData);

    const sql = `
      UPDATE products
      SET title = ?, description = ?, cat_id = ?, price = ?, city = ?, img_url = ?, updated = ?
      WHERE id = ?`;

    const [product, error] = await sqlQuarryHelper(sql, [...prodData, prodId]);
    if (error) {
      console.log(chalk.bgRed.whiteBright('delete item error ==='), error);
      // Delete the uploaded file
      deleteFile(img_url);
      return next(error);
    }

    // console.log(chalk.bgGreen.whiteBright('product: '), product);

    if (product.affectedRows !== 1) {
      console.log(chalk.bgRed.whiteBright('update product error: '), product);
      // Delete the uploaded file
      deleteFile(img_url);
      return next(new APIError('Something went wrong', 400));
    }

    // delete prev image
    deleteFile(lastImgUrl);

    res.status(200).json({
      msg: 'Product updated successfully',
    });
  },
};
