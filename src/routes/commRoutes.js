const express = require('express');

const commRoutes = express.Router();
const authToken = require('../middleware/authToken');
const commControllers = require('../controllers/commControllers');

// ROUTES

// GET create single comment
commRoutes.post('/comments/', commControllers.createComments);
// GET single comment by product id
commRoutes.get('/comments/:prodId', commControllers.getComments);

module.exports = commRoutes;
