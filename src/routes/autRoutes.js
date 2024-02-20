const express = require('express');
const authControllers = require('../controllers/authControllers');
const { loginValidation, signUpValidation } = require('../middleware/validation');

const authRouter = express.Router();

// routes
authRouter.post('/auth/register', signUpValidation, authControllers.register);
authRouter.post('/auth/login', loginValidation, authControllers.login);

module.exports = authRouter;
