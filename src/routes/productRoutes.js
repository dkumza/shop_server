const express = require('express');

const productRouter = express.Router();
const productControllers = require('../controllers/productControllers');

// ROUTES

// GET all products
productRouter.get('/products', productControllers.getAllProducts);
// GET single product
productRouter.get('/products/:prodId', productControllers.getSingleProduct);

module.exports = productRouter;
