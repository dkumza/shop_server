const express = require('express');

const productRouter = express.Router();
const productControllers = require('../controllers/productControllers');
const { upload, imgQuality, delFolderOnLimitSizeError } = require('../middleware/upload');
const authToken = require('../middleware/authToken');

// ROUTES

// GET all products
productRouter.get('/products', authToken, productControllers.getAllProducts);
// GET single product
productRouter.get('/product/:prodId', authToken, productControllers.getSingleProduct);
// POST - create new product
productRouter.post(
  '/products',
  authToken,
  upload.array('image', 4),
  delFolderOnLimitSizeError,
  imgQuality,
  productControllers.createProduct,
);
// DELETE - delete product
productRouter.delete('/product/:prodId', authToken, productControllers.delete);
// UPDATE - edit product by ID
productRouter.put(
  '/product/:prodId',
  authToken,
  upload.array('image', 4),
  delFolderOnLimitSizeError,
  imgQuality,
  productControllers.edit,
);
productRouter.get('/personal/:userID', authToken, productControllers.getByUserID);
// GET products data
productRouter.get('/products-data', authToken, productControllers.productsData);

// GET product favorites
productRouter.post('/favorites/:prodID', authToken, productControllers.addFavorite);
// DELETE product favorites
productRouter.delete('/favorites/:prodID', authToken, productControllers.dellFavorite);
// Get product favorites by userID
productRouter.get('/favorites/:userID', authToken, productControllers.userFavorites);

module.exports = productRouter;
