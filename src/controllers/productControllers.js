const chalk = require('chalk');
const APIError = require('../utils/apiErrors');
const { sqlQuarryHelper } = require('../utils/helpers');
const { deleteFile } = require('../middleware/upload');

module.exports = {
  getAllProducts: async (req, res, next) => {
    const sql = 'SELECT * FROM `products` WHERE isDeleted=0';
    const [products, error] = await sqlQuarryHelper(sql);

    if (error) return next(error);

    res.json(products);
  },

  getSingleProduct: async (req, res, next) => {
    const { prodId } = req.params;

    // const sql = 'SELECT * FROM `products` WHERE id=?';
    const sql = `SELECT  P.id, P.title, P.description, P. price, P.cat_id, C.name AS cat_name, SC.id AS sub_id, SC.name AS sub_c_name, 
    P.city, CT.name AS city_name, P.updated, P.img_urls, U.name AS user_name, U.telephone, U.id AS user_id, P.isDeleted
    FROM products AS P
    JOIN categories AS C ON P.cat_id = C.id
    JOIN sub_categories AS SC ON P.sub_id = SC.id
    JOIN cities AS CT on P.city = CT.id
    JOIN users AS U on P.user_id = U.id
    WHERE P.id=?`;
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

  createProduct: async (req, res, next) => {
    const { userID } = req; // user ID from token
    const { user_id, title, description, price, cat_id, sub_id, city } = req.body;

    if (userID !== +user_id) {
      // if not "admin"
      deleteFile();
      return next(new APIError('Unauthorized', 400));
    }

    const img_urls = req.files.map((file) => file.path);
    const img_urls_string = JSON.stringify(img_urls);

    const prodData = [
      title,
      description,
      price,
      cat_id,
      sub_id,
      img_urls_string,
      user_id,
      city,
    ];
    const sql = `INSERT INTO products (title, description, price, cat_id, sub_id, img_urls, user_id, city)
    VALUES (?,?,?,?,?,?,?,?)`;
    const [product, error] = await sqlQuarryHelper(sql, prodData);

    if (error) {
      console.log(chalk.bgRed.whiteBright('error ==='), error);
      // Delete the uploaded images on sql error
      deleteFile();
      return next(error);
    }

    if (product.affectedRows !== 1) {
      console.log(chalk.bgRed.whiteBright('product ==='), product);
      // Delete the uploaded images on sql error
      deleteFile();
      return next(new APIError('Something went wrong', 400));
    }

    res.status(201).json({
      id: product.insertId,
      msg: 'Successfully created',
    });
  },

  delete: async (req, res, next) => {
    console.log(chalk.bgGreen.whiteBright('req.body: '), req.body);
    const { prodId } = req.params;
    const { userID } = req;
    const { productUserID, isDeleted } = req.body;

    if (userID !== productUserID || userID !== 1) {
      return next(new APIError('Unauthorized', 400));
    }

    const sql = `UPDATE products SET isDeleted=? WHERE id=? LIMIT 1`;
    const [product, error] = await sqlQuarryHelper(sql, [isDeleted, prodId]);
    if (error) {
      console.log(chalk.bgRed.whiteBright('delete item error ==='), error);
      return next(error);
    }

    if (product.affectedRows !== 1) {
      console.log(chalk.bgRed.whiteBright('delete product error: '), product);
      return next(new APIError('Something went wrong', 400));
    }

    res.status(200).json({
      msg: isDeleted ? 'Product deleted successfully' : 'Product restored successfully',
    });
  },

  edit: async (req, res, next) => {
    let goodImgUrls;
    const { userID } = req; // user ID from token
    const { prodId } = req.params;
    const { title, description, price, cat_id, sub_id, city, user_id, img_old_url } =
      req.body;
    console.log(chalk.bgGreen.whiteBright('req.body: '), req.body);

    // check where images exists, if no updated images it will be at req.body
    if (req.body.img_urls) {
      goodImgUrls = req.body.img_urls;
      console.log('goodImgUrls: ', goodImgUrls);

      // and if updated images will be at req.files (because sended with FormData())
    } else {
      const img_urls = req.files.map((file) => file.path);
      goodImgUrls = JSON.stringify(img_urls);
    }

    // check if user ID matched from FE with token
    if (userID !== +user_id) {
      // if id's do not match - delete uploads and return error
      deleteFile();
      return next(new APIError('Unauthorized', 400));
    }

    const updatedDate = new Date(); // date for update - updated date

    // needed data from FE
    const prodData = [
      title,
      description,
      cat_id,
      sub_id,
      price,
      city,
      goodImgUrls,
      updatedDate,
    ];

    const sql = `
      UPDATE products
      SET title = ?, description = ?, cat_id = ?, sub_id = ?, price = ?, city = ?, img_urls = ?, updated = ?
      WHERE id = ?`;

    const [product, error] = await sqlQuarryHelper(sql, [...prodData, prodId]);
    if (error) {
      console.log(chalk.bgRed.whiteBright('update item error ==='), error);
      // Delete the uploaded file
      deleteFile();
      return next(error);
    }

    if (product.affectedRows !== 1) {
      console.log(chalk.bgRed.whiteBright('update product error: '), product);
      // Delete the uploaded file
      deleteFile();
      return next(new APIError('Something went wrong', 400));
    }

    // delete prev image if uploaded on edit
    !req.body.img_urls && deleteFile(img_old_url);

    res.status(200).json({
      msg: 'Product updated successfully',
    });
  },

  getByUserID: async (req, res, next) => {
    const { userID } = req; // user ID from token
    const { userID: userFromFE } = req.params;
    console.log(chalk.bgGreen.whiteBright('userID: '), userID);
    console.log(chalk.bgGreen.whiteBright('userFromFE: '), userFromFE);
    // const { title, description, price, cat_id, sub_id, city, user_id, img_old_url } =
    //   req.body;

    const sql = 'SELECT * FROM `products` WHERE user_id=?';
    const [products, error] = await sqlQuarryHelper(sql, [userFromFE]);

    if (error) return next(error);

    res.json(products);
  },
};
