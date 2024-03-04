const chalk = require('chalk');
const APIError = require('../utils/apiErrors');
const { sqlQuarryHelper } = require('../utils/helpers');

module.exports = {
  createComments: async (req, res, next) => {
    const { userID } = req; // user ID from token
    const { prodId } = req.params;
    const { content, userID: user_id } = req.body;

    if (userID !== +user_id) {
      return next(new APIError('Unauthorized', 400));
    }

    const commData = [prodId, content, user_id];
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
  deleteComm: async (req, res, next) => {
    const { userID } = req;
    const { commId } = req.params;
    const { userID: productUserID } = req.body;
    console.log(chalk.bgGreen.whiteBright('commID: '), req.params);

    if (+userID !== +productUserID) {
      return next(new APIError('Unauthorized', 400));
    }

    const sql = `DELETE FROM comments WHERE id=? LIMIT 1`;
    const [comment, error] = await sqlQuarryHelper(sql, [commId]);
    if (error) {
      console.log(chalk.bgRed.whiteBright('delete item error ==='), error);
      return next(error);
    }

    if (comment.affectedRows !== 1) {
      console.log(chalk.bgRed.whiteBright('delete comment error: '), comment);
      return next(new APIError('Something went wrong', 400));
    }

    res.status(200).json({
      msg: 'Comment deleted successfully',
    });
  },

  getComments: async (req, res, next) => {
    const { prodId } = req.params;
    const sql = `SELECT 
                 C.id, C.content, C.created, C.userID AS userID, U.name AS userName 
                 FROM comments AS C
                 JOIN users as U WHERE C.userID=U.id and C.productID=?`;

    // make SQL quarry
    const [comments, error] = await sqlQuarryHelper(sql, [prodId]);

    if (error) return next(error);

    if (comments.length === 0) return; // no comments

    res.json(comments);
  },
};
