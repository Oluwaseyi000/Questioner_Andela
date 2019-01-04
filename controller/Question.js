let Questions = require('../model/Question');


createQuestion = (req, res) => {
   const newQuestion = {
      id: Date.now(),
      createdOn: new Date(),
      createdBy: req.body.userId,
      meetup: req.body.meetupId,
      title: req.body.title,
      body: req.body.body,
      votes: 0,
      upvotes:0,
      downvotes: 0,
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
         data: newQuestion
      })
   }
}

module.exports = {
   createQuestion
}