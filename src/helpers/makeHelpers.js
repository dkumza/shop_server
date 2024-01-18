const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const chalk = require('chalk');
const APIError = require('../apiError/APiError');

const { dbConfig, jwtSecret } = require('./configHelper');

const pool = mysql.createPool(dbConfig);

module.exports = {
  makeSqlQuarry: async (sql, argArr = []) => {
    let connection;
    try {
      connection = await pool.getConnection(); // connecting to DB
      const [rows] = await connection.execute(sql, argArr); // execute task
      return [rows, null];
    } catch (error) {
      return [null, error];
    } finally {
      if (connection) connection.release();
    }
  },

  makeJWTToken: (data, expires = '1h') => {
    if (!jwtSecret) throw new Error('no secret provided'); // while in dev mode
    return jwt.sign(data, jwtSecret, { expiresIn: expires });
  },

  makeError: (gotError, req, res, next) => {
    console.log(chalk.bgRed.whiteBright('gotError ==='), gotError);

    if (gotError instanceof APIError) {
      return res.status(gotError.status).json({
        error: gotError.message,
      });
    }

    if (gotError?.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        error: 'Email already taken',
      });
    }

    // in other condition
    res.status(500).json({
      error: 'System error',
    });
  },
};
