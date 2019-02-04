import pool from '../model/db_connect';

class questionController {
  /**
   * Create A Question
   * @param {object} req
   * @param {object} res
   * @returns {object} question object
   */
  static createQuestion(req, res) {
    const text = 'INSERT INTO questions(createdBy,meetupId, title, body, vote) VALUES($1, $2, $3,$4, $5) returning id';

    const value = [
      res.authData.userDetail.id,
      req.body.meetupId,
      req.body.title,
      req.body.body,
      0,
      new Date(),
    ];

    pool.query(text, value)
      .then(() => res.status(201).json({
        status: 201,
        message: 'Question successfully added',
        data: [{
          user: res.authData.userDetail.id,
          meetup: req.body.meetupId,
          title: req.body.title,
          body: req.body.body,
        }],
      }));
  }

  static upvote(req, res) {
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

        const value2 = [question.rows[0].vote + 1, req.params.questionId];
        pool.query(text2, value2);

        return res.status(200).json({
          status: 200,
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
  }

  static getASpecificQuestionRecord(req, res) {
    /**
     * Get A Meetup
     * @param {object} req
     * @param {object} res
     * @returns {object} meetup object
     */


    const text = `select questions.*,
   users.firstname
   from questions 
   left join users on users.id = questions.createdBy
   where questions.meetupid=$1
   group by(questions.id, users.id) `;
    const value = [req.params.meetupId];

    pool.query(text, value)
      .then(question => res.status(200).json({
        status: 200,
        data: question.rows,
      }))
      .catch(err => res.json(err));
  }

  static getASpecificCommentRecord(req, res) {
    /**
     * Get A Meetup
     * @param {object} req
     * @param {object} res
     * @returns {object} meetup object
     */


    const text = `
   select comments.*,
     users.firstname
     from comments 
     left join users on users.id = comments.userid
     where comments.questionid=$1
     group by(comments.id, users.id)
   `;
    const value = [req.params.questionId];

    pool.query(text, value)
      .then(comment => res.status(200).json({
        status: 200,
        data: comment.rows,
      }) )
      .catch(err => res.json(err));
  }
}
export default questionController;
