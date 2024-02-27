const express = require('express');

const commRoutes = express.Router();
const authToken = require('../middleware/authToken');
const commControllers = require('../controllers/commControllers');

// ROUTES

// GET single product
commRoutes.get('/comments/:prodId', commControllers.getComments);

module.exports = commRoutes;
