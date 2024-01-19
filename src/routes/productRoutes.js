const express = require('express');

const productRouter = express.Router();
const productControllers = require('../controllers/productControllers');
const { upload } = require('../middleware/uploadMW');

// ROUTES

// GET all products
productRouter.get('/products', productControllers.getAllProducts);
// GET single product
productRouter.get('/products/:prodId', productControllers.getSingleProduct);
// POST - create new product
productRouter.post('/products', upload.single('image'), productControllers.createProduct);
// DELETE - delete product
// productRouter.post('/products', productControllers);

module.exports = productRouter;
