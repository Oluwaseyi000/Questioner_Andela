/* eslint-disable consistent-return */
import pool from '../model/db_connect';

/**
 * Create A Comment
 * @param {object} req
 * @param {object} res
 * @returns {object} comment object
 */
class commentController {
  static addComment(req, res) {
    if (!req.body.questionId || !req.body.comment) {
      return res.status(400).json({
        status: 400,
        body:req.body,
        error: 'Bad Request, please include  question Id and comment in your request as parameter',
      });
    }

    const text = 'INSERT INTO comments(userid, questionId, body, createdon) VALUES($1, $2, $3,$4)returning  questionid, body, createdon  ';

    const value = [
      res.authData.userDetail.id,
      req.body.questionId,
      req.body.comment,
      new Date(),
    ];


    pool.query(text, value)
      .then(comment => res.status(201).json({
        status: 201,
        data: {
          question: comment.rows[0].questionid,
          comment: comment.rows[0].body,

        },
      }))
      .catch((err) => res.json({
        status: 404,
        err,
        error2: 'question do not exist for the specified question id',
      }));

    // const text2 = 'SELECT id, title,body FROM questions WHERE id=$1';
    // const value2 = [req.body.questionId];

    // pool.query(text2, value2)
    //   .then(question => res.status(201).json({
    //     status: 201,
    //     data: {
    //       question: question.rows[0].id,
    //       title: question.rows[0].title,
    //       body: question.rows[0].body,
    //       comment: req.body.comment,
    //     },
    //   }));
  }
}
export default commentController;