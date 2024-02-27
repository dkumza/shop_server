const chalk = require('chalk');
const APIError = require('../utils/apiErrors');
const { sqlQuarryHelper } = require('../utils/helpers');

module.exports = {
  createComments: async (req, res, next) => {
    const { userID } = req; // user ID from token
    const { prodId, content, userID: user_id } = req.body;

    if (userID !== +user_id) {
      return next(new APIError('Unauthorized', 400));
    }

    const commData = [];
    const sql = `INSERT INTO comments (productID, content, userID)
    VALUES (?,?,?)`;
    const [comment, error] = await sqlQuarryHelper(sql, commData);

    if (error) {
      console.log(chalk.bgRed.whiteBright('error ==='), error);
      return next(error);
    }

    if (comment.affectedRows !== 1) {
      console.log(chalk.bgRed.whiteBright('comment ==='), comment);
      return next(new APIError('Something went wrong', 400));
    }

    res.status(201).json({
      id: comment.insertId,
      msg: 'Successfully created',
    });
  },
  getComments: async (req, res, next) => {
    const { prodId } = req.params;
    const sql = 'SELECT * FROM `comments` WHERE productID=?';

    // make SQL quarry
    const [comments, error] = await sqlQuarryHelper(sql, [prodId]);

    if (error) return next(error);

    if (comments.length === 0) {
      return next(new APIError('Comments not found', 404));
    }

    res.json(comments);
  },
};
