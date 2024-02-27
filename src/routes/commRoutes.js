const express = require('express');

const commRoutes = express.Router();
const authToken = require('../middleware/authToken');
const commControllers = require('../controllers/commControllers');

// ROUTES

// GET create single comment
commRoutes.post('/comments/:prodId', authToken, commControllers.createComments);
// DELETE delete single comment by comment id
commRoutes.delete('/comments/:commId', authToken, commControllers.deleteComm);
// GET single comment by product id
commRoutes.get('/comments/:prodId', commControllers.getComments);

module.exports = commRoutes;
