const express = require('express');

const productRouter = express.Router();
const productControllers = require('../controllers/productControllers');
const { upload, imgQuality } = require('../middleware/upload');
const authToken = require('../middleware/authToken');

// ROUTES

// GET all products
productRouter.get('/products', productControllers.getAllProducts);
// GET single product
productRouter.get('/products/:prodId', productControllers.getSingleProduct);
// POST - create new product
productRouter.post(
  '/products',
  authToken,
  upload.single('image'),
  imgQuality,
  productControllers.createProduct,
);
// DELETE - delete product
productRouter.delete('/products/:prodId', authToken, productControllers.delete);

module.exports = productRouter;
