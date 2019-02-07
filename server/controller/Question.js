import pool from '../model/db_connect';

class questionController {
  /**
   * Create A Question
   * @param {object} req
   * @param {object} res
   * @returns {object} question object
   */
  static createQuestion(req, res) {
    const text = 'INSERT INTO questions(createdBy,meetupId, title, body, vote, createdon) VALUES($1, $2, $3,$4, $5,$6) returning id';

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
    // const text = 'SELECT * FROM questions WHERE id=$1';
    const value = [
      req.params.questionId,
      res.authData.userDetail.id,
      'upvote',
      new Date(),
    ];

    const text = 'INSERT INTO votes(questionid, voterid, votetype,createdon) VALUES($1, $2, $3,$4) ON CONFLICT (questionid, voterid) DO UPDATE SET votetype=$3, createdon=$4 RETURNING *';

    const value2 = [req.params.questionId];
    const text2 = 'update questions set vote=vote+1 where id=$1 returning *';

    pool.query(text2, value2);

    pool.query(text, value)
      .then(vote => res.json({
        status: 201,
        data: {
          message: 'upvote successful',
        },
      }))
      .catch(err => res.json({ err }));
  }

  static downvote(req, res) {
    /**
     * downvote question:  decrease the vote count
     * @param {object} req
     * @param {object} res
     * @returns {object} vote counts
     */
    const value = [
      req.params.questionId,
      res.authData.userDetail.id,
      'downvote',
      new Date(),
    ];

    const text = 'INSERT INTO votes(questionid, voterid, votetype,createdon) VALUES($1, $2, $3,$4) ON CONFLICT (questionid, voterid) DO UPDATE SET votetype=$3, createdon=$4 RETURNING *';
    const value2 = [req.params.questionId];
    const text2 = 'update questions set vote=vote-1 where id=$1 returning *';

    pool.query(text, value)
      .then(inser => pool.query(text2, value2))
      .then(inser => vote => res.status(201).json({
          status: 201,
          data: {
            message: 'downvote successful',
            inser,
          },
        }),)
      .catch(err => res.json({ err }));
  }

  static getASpecificQuestionRecord(req, res) {
    /**
     * Get A Meetup
     * @param {object} req
     * @param {object} res
     * @returns {object} meetup object
     */


    const text = `select questions.*,
    count(vote) as vcount,
       users.firstname
       from questions 
       left join users on users.id = questions.createdBy
       left join votes on votes.questionid=questions.id
       where questions.meetupid=$1
       group by(questions.id, users.id)
       order by questions.vote DESC`;
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
      }))
      .catch(err => res.json(err));
  }

  static getUpvoteCount(req, res) {
    /**
     * upvote count
     * @param {object} req
     * @param {object} res
     * @returns {object} count object
     */

    const text = `
    select count(*) as upcount from votes 
    where questionid=$1 and votetype='downvote' 
   `;
    const value = [req.params.questionId];

    pool.query(text, value)
      .then(vote => res.status(200).json({
        status: 200,
        data: vote.rows[0],
      }))
      .catch(err => res.json(err));
  }

  static downUpvoteCount(req, res) {
    /**
     * downvote count
     * @param {object} req
     * @param {object} res
     * @returns {object} meetup object
     */

    const text = `
    select count(*) as upcount from votes 
    where questionid=$1 and votetype='downvote' 
   `;
    const value = [req.params.questionId];

    pool.query(text, value)
      .then(vote => res.status(200).json({
        status: 200,
        data: vote.rows[0],
      }))
      .catch(err => res.json(err));
  }
}
export default questionController;
