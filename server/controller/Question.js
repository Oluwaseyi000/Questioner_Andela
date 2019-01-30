<<<<<<< HEAD
=======
import { exists } from 'fs';
import Questions from '../model/Question';
import Meetups from '../model/Meetup';
import Authenticate from '../middleware/authorize';
>>>>>>> consume API
import pool from '../model/db_connect';

class questionController {
  /**
<<<<<<< HEAD
   * Create A Question
   * @param {object} req
   * @param {object} res
   * @returns {object} question object
   */
  static createQuestion(req, res) {
    const text = 'INSERT INTO questions(createdBy,meetupId, title, body, vote) VALUES($1, $2, $3,$4, $5) returning id';

=======
    * Create A Question
    * @param {object} req
    * @param {object} res
    * @returns {object} question object
    */
  static createQuestion(req, res) {
    confirmToken(req, res);


    const text = 'INSERT INTO questions(createdBy,meetupId, title, body, vote) VALUES($1, $2, $3,$4, $5) returning id';


>>>>>>> consume API
    const value = [
      res.authData.userDetail.id,
      req.body.meetupId,
      req.body.title,
      req.body.body,
      0,
    ];

    pool.query(text, value)
<<<<<<< HEAD
      .then(() => res.status(201).json({
=======
      .then(question => res.status(201).json({
>>>>>>> consume API
        status: 201,
        message: 'Question successfully added',
        data: [{
          user: res.authData.userDetail.id,
          meetup: req.body.meetupId,
          title: req.body.title,
          body: req.body.body,
        }],
      }));
<<<<<<< HEAD
=======

    // }
>>>>>>> consume API
  }

  static upvote(req, res) {
    /**
<<<<<<< HEAD
     * Vote question: increase or decrease the vote count
     * @param {object} req
     * @param {object} res
     * @returns {object} vote counts
     */
=======
       * Vote question: increase or decrease the vote count
       * @param {object} req
       * @param {object} res
       * @returns {object} vote counts
       */
>>>>>>> consume API
    const text = 'SELECT * FROM questions WHERE id=$1';
    const value = [req.params.questionId];

    pool.query(text, value)
      .then((question) => {
        req.currentVote = question.rows[0].vote;

        const text2 = 'UPDATE questions SET vote=$1 WHERE id=$2 RETURNING *';

        const value2 = [question.rows[0].vote + 1, req.params.questionId];
        pool.query(text2, value2);

        return res.status(200).json({
          status: 200,
<<<<<<< HEAD
          data: [{
            meetup: req.params.questionId,
            title: question.rows[0].title,
            body: question.rows[0].body,
            vote: question.rows[0].vote + 1,
          }],

        });
      });
  }

  static downvote(req, res) {
    /**
     * Vote question: increase or decrease the vote count
     * @param {object} req
     * @param {object} res
     * @returns {object} vote counts
     */


    const text = 'SELECT * FROM questions WHERE id=$1';
    const value = [req.params.questionId];

    pool.query(text, value)
      .then((question) => {
        req.currentVote = question.rows[0].vote;

        const text2 = 'UPDATE questions SET vote=$1 WHERE id=$2 RETURNING *';

        const value2 = [question.rows[0].vote - 1, req.params.questionId];
        pool.query(text2, value2);

        return res.status(200).json({
          status: 200,
          data: [{
            meetup: req.params.questionId,
            title: question.rows[0].title,
            body: question.rows[0].body,
            vote: question.rows[0].vote - 1,
          }],

        });
      });
=======
          data: [
            {
              meetup: req.params.questionId,
              title: question.rows[0].title,
              body: question.rows[0].body,
              vote: question.rows[0].vote + 1,
            },
          ],

        });
      });
  }

  static downvote(req, res) {
    /**
       * Vote question: increase or decrease the vote count
       * @param {object} req
       * @param {object} res
       * @returns {object} vote counts
       */


    const text = 'SELECT * FROM questions WHERE id=$1';
    const value = [req.params.questionId];

    pool.query(text, value)
      .then((question) => {
        req.currentVote = question.rows[0].vote;

        const text2 = 'UPDATE questions SET vote=$1 WHERE id=$2 RETURNING *';

        const value2 = [question.rows[0].vote - 1, req.params.questionId];
        pool.query(text2, value2);

        return res.status(200).json({
          status: 200,
          data: [
            {
              meetup: req.params.questionId,
              title: question.rows[0].title,
              body: question.rows[0].body,
              vote: question.rows[0].vote - 1,
            },
          ],

        });
      });
  }

  static addComment(req, res) {
    confirmToken(req, res);
    if (!req.body.questionId || !req.body.comment) {
      return res.status(400).json({
        status: 400,
        error: 'Bad Request, please include meetup question Id and comment in your request as parameter',
      });
    }

    const text = 'INSERT INTO comments(userid, questionId, body) VALUES($1, $2, $3)returning  body  ';

    const value = [
      res.authData.userDetail.id, req.body.questionId, req.body.comment,
    ];


    pool.query(text, value)
      .catch(error => res.json({
        status: 404,
        error,
        error2: 'question do not exist for the specified question id' 
}));

    const text2 = 'SELECT id, title,body FROM questions WHERE id=$1';
    const value2 = [req.body.questionId];

    pool.query(text2, value2)
      .then(question => res.status(201).json({
        status: 201,
        data: {
          question: question.rows[0].id,
          title: question.rows[0].title,
          body: question.rows[0].body,
          comment: req.body.comment,
        },
      }));
>>>>>>> consume API
  }
}
export default questionController;
