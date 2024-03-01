// file for authToken validation
const jwt = require('jsonwebtoken');
const chalk = require('chalk');

const { jwtSecret } = require('../config/config');

module.exports = function authToken(req, res, next) {
  console.log('authToken in progress');
  const prepForToken = req.headers.authorization;
  if (!prepForToken) throw new Error('Unauthorized');
  try {
    const token = prepForToken.split(' ')[1];
    console.log(chalk.bgRed.whiteBright('token: '), token);
    if (!token) throw new Error('Unauthorized token');
    const decoded = jwt.verify(token, jwtSecret);
    req.userID = decoded.sub;
    next();
  } catch (error) {
    console.log(chalk.bgRed.whiteBright('error: '), error);
    res.status(401).json({ msg: 'Auth error' });
  }
};
