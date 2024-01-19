const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const { dbConfig, jwtSecret } = require('../config/config');

module.exports = {
  sqlQuarryHelper: async (sql, argArr = []) => {
    let connection;
    try {
      connection = await mysql.createConnection(dbConfig); // connecting to DB
      const [rows] = await connection.execute(sql, argArr); // execute task
      return [rows, null];
    } catch (error) {
      return [null, error];
    } finally {
      if (connection) connection.end();
    }
  },

  jWTTokenHelper: (data, expires = '1h') => {
    if (!jwtSecret) throw new Error('no secret provided'); // while in dev mode
    return jwt.sign(data, jwtSecret, { expiresIn: expires });
  },
};
