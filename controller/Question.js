let Questions = require('../model/Question');
let Meetups = require('../model/Meetup');
let Votes = require('../model/Vote');

createQuestion = (req, res) => {
   const newQuestion = {
      id: Date.now(),
      createdOn: new Date(),
      createdBy: req.body.userId,
      meetup: req.body.meetupId,
      title: req.body.title,
      body: req.body.body,
      votes: 0
   }

   if (!newQuestion.title || !newQuestion.body || !newQuestion.createdBy || !newQuestion.meetup) {
      res.json({
         status: 400,
         error: 'Bad request error, missing required data. Note: userId, MeetupId, title and body are required.'
      })
   } else {
      Questions.push(newQuestion);
      res.json({
         status: 201,
         message: 'Your questions is  successfully created',
         data: newQuestion,
         all: Questions
      })
   }
}

voteQuestion = (req, res) => {

   if (!req.params.questionId || !req.body.userId || !req.body.body || !req.body.title || !req.body.voteType) {
      res.json({
         status: 400,
         error: 'Bad Request, please include meetup Id, user id, title, body, vote type in your request as parameter'
      })
   } else {

      const question = Questions.find(question => question.id === Number(req.params.questionId));
      if (!question || question === -1) {
         res.json({
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
            res.json({
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
            res.json({
               status: 200,
               message: `Question upvoted`,
               data: [{
                  meetup: vote.meetupId,
                  title: vote.title,
                  body: vote.body,
                  votes: question.votes
               }]
            })
         }
      }
   }
}
module.exports = {
   createQuestion,
   voteQuestion
}