const express = require('express');

const productRouter = express.Router();
const productControllers = require('../controllers/productControllers');
const { upload, imgQuality } = require('../middleware/upload');
const authToken = require('../middleware/authToken');

// ROUTES

// GET all products
productRouter.get('/products', productControllers.getAllProducts);
// GET single product
productRouter.get('/product/:prodId', authToken, productControllers.getSingleProduct);
// POST - create new product
productRouter.post(
  '/products',
  authToken,
  upload.array('image', 4),
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
  imgQuality,
  productControllers.edit,
);

module.exports = productRouter;
