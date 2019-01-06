let express = require('express');
let router = express.Router();

let meetupController=require('./controller/Meetup');
let questionController=require('./controller/Question');
let userController = require('./controller/User');

router.get('/meetups/upcomingmeetups', meetupController.upcomingMeetups);
router.post('/meetups', meetupController.createMeetup);
router.get('/meetups/:meetupId', meetupController.getASpecificMeetupRecord);
router.get('/meetups', meetupController.getAllMeetupsRecord);
router.delete('/meetups/:meetupId', meetupController.deleteMeetup);

router.post('/questions', questionController.createQuestion);
router.patch('/questions/:questionId/upvote', questionController.voteQuestion);
router.patch('/questions/:questionId/downvote', questionController.voteQuestion);

router.post('/meetups/:meetupId/rsvps', userController.rsvps);

router.patch('/questions/:questionId/*', (req, res)=>{
   res.json({
      status:400,
      error: 'vote type incorrect, it could only be upvote or downvote'
   })
});
router.patch('/questions/:questionId', (req, res)=>{
   res.json({
      status:400,
      error: 'vote type missing, it could only be upvote or downvote'
   })
});
router.patch('/questions/*', (req, res)=>{
   res.json({
      status:400,
      error: 'meetup id and vote type missing, vote type could only be upvote or downvote'
   })
});
router.route('/meetups')
   .delete((req, res) => {
      res.json({
         status: 400,
         error: 'Meetup id missing in DELETE request, please add meetup id to your request'
      });
   })


   router.get('/',  (req, res) => {
      res.json({
         status: 200,
         messgae: 'Welcome to questioner API'
      });
   })
   
router.route('*')
   .get((req, res) => {
      res.json({
         status: 404,
         error: 'Incorrect API endpoint;  Preceed your API endpoint with API please check your api URL (even for as little thing as spelling)'
      });
   })

   .post((req, res) => {
      res.json({
         status: 404,
         error: 'Incorrect API endpoint,  Preceed your API endpoint with API please check your api  URL(preceed your request url with api/v1)'
      });
   })
   .put((req, res) => {
      res.json({
         status: 404,
         error: 'Incorrect API endpoint,  Preceed your API endpoint with API please check your api URL (preceed your request url with api/v1)'
      });
   })
   .delete((req, res) => {
      res.json({
         status: 404,
         error: 'Incorrect API endpoint,  Preceed your API endpoint with API please check your api  URL(preceed your request url with api/v1)'
      });
   });

  

module.exports = router;