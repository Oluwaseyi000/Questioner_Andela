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
          
        res.authData.userDetail.id,
         req.body.meetupId,
         req.body.title,
          req.body.body,
          0
      ]

      pool.query(text,value)
      .then(question => {
         // res.meetupId= meetup.rows[0].id;
         return res.status(200).json({
            status: 200,
            message:'Question successfully added',
            data: {userId:res.authData.userDetail.id,
                  meetupId: req.body.meetupId,
                  title: req.body.title,
                  body:req.body.body},
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

      if (!req.params.questionId || !req.body.userId || !req.body.body || !req.body.title || !req.body.voteType) {
         return res.status(400).json({
            status: 400,
            error: 'Bad Request, please include meetup Id, user id, title, body, vote type in your request as parameter'
         })
      } else {

         const question = Questions.find(question => question.id === parseInt(req.params.questionId));
         if (!question || question === -1) {
            return res.status(404).json({
               status: 404,
               error: `question with id ${req.params.questionId} not found`,
               data: Questions
            })
         } else {
            vote = {
               voteId: Date.now(),
               userId: req.body.userId,
               meetupId: req.body.meetupId,
               questionId: req.params.questionId,
               title: req.body.title,
               body: req.body.body,
               voteType: req.body.voteType
            }
            Votes.push(vote)
            if (req.body.voteType === 'upvote') {
               question.votes = question.votes + 1;
               return res.status(200).json({
                  status: 200,
                  message: `Question upvoted`,
                  data: [{
                     meetup: vote.meetupId,
                     title: vote.title,
                     body: vote.body,
                     votes: question.votes
                  }]
               })
            } else if (req.body.voteType === 'downvote') {
               question.votes = question.votes - 1;
               return res.status(200).json({
                  status: 200,
                  message: `Question downvoted`,
                  data: [{
                     body: vote.body,
                     votes: question.votes
                  }]
               })
            }
         }
      }
   }
}
export default questionController;