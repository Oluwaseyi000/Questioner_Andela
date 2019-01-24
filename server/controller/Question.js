import Questions from '../model/Question';
import Meetups from '../model/Meetup';
import Authenticate from '../middleware/authorize';
import pool from '../model/db_connect';

const confirmToken = Authenticate.confirmToken;
class questionController {
   /**
    * Create A Question
    * @param {object} req 
    * @param {object} res
    * @returns {object} question object 
    */
   static createQuestion(req, res) {

      confirmToken(req, res);


      const text = `INSERT INTO questions(createdBy,meetupId, title, body, vote) VALUES($1, $2, $3,$4, $5) returning id`;

     
      const value = [
         res.authData.theuser.id,
         req.body.meetupId,
         req.body.title,
         req.body.body,
         0
      ]

      pool.query(text, value)
         .then(question => {
            return res.status(200).json({
               status: 200,
               message: 'Question successfully added',
               data: [{
                  user: res.authData.theuser.id,
                  meetup: req.body.meetupId,
                  title: req.body.title,
                  body: req.body.body
               }],
            })
         })

      // }
   }

   static voteQuestion(req, res) {
      /**
       * Vote question: increase or decrease the vote count
       * @param {object} req 
       * @param {object} res
       * @returns {object} vote counts
       */

      if (!req.params.questionId || !req.params.voteType) {
         return res.status(400).json({
            status: 400,
            error: 'Bad Request, please include meetup Id and vote type in your request as parameter'
         })
      } else {
         const text = `UPDATE questions SET vote=vote+1 where id=$1 RETURNING title,body, vote, meetupId`;
         const value2 = [req.params.questionId];
         pool.query(text, value2)
            .then(ques => {

               const value2 = [req.params.questionId];
               const text2 = `SELECT id FROM meetups WHERE id=$1`;
               pool.query(text2, ques.meetupId)
                  .then()
               return res.json({
                  ques: ques.rows
               })
            });

      }


   }
   static addComment(req, res) {
      confirmToken(req, res);
      if (!req.body.questionId || !req.body.comment) {
         return res.status(400).json({
            status: 400,
            error: 'Bad Request, please include meetup question Id and comment in your request as parameter'
         })
      } else {

         const text = `SELECT id,title,body FROM questions WHERE id=$1`;
         const id = [req.body.questionId];

         pool.query(text, id)
            .then(meetup => {
               return res.status(200).json({
                  status: 200,
                  message: "comment added",
                  userId: res.authData.userDetail.id,
                  comment: req.body.comment,
                  question: meetup.rows[0],
               })
            })
      }
   }
}
export default questionController;