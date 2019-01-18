import express from 'express';
import questionController from './controller/Question';
import userController from './controller/User';
import meetupController from './controller/Meetup';
 
import userMiddleware from './middleware/User';
import meetupMiddleware from './middleware/Meetup';
import authorize from './middleware/authorize';
import questionMiddleware from './middleware/Question';
const jwt = authorize.verifyToken;

let router = express.Router();

// router.use('api/v1',  jwt);
router.get('/meetups/upcomingmeetups', jwt, meetupController.upcomingMeetups);
router.post('/meetups', jwt, meetupMiddleware.createMeetup, meetupController.createMeetup);
router.get('/meetups/:meetupId', jwt, meetupMiddleware.getASpecificMeetupRecord, meetupController.getASpecificMeetupRecord);
router.get('/meetups', jwt,meetupController.getAllMeetupsRecord);
router.delete('/meetups/:meetupId', jwt,meetupMiddleware.deleteMeetup, meetupController.deleteMeetup);
router.post('/meetups/:meetupId/rsvps', jwt,userController.createRsvps);

router.post('/questions', jwt, questionMiddleware.createQuestion, questionController.createQuestion);
router.patch('/questions/:questionId/:voteType', jwt, questionController.voteQuestion);
router.patch('/questions/:questionId/downvote', jwt, questionController.voteQuestion);



router.post('/auth/signup', userMiddleware.userSignup,  userController.userSignup);

router.post('/auth/login', userMiddleware.userLogin,  userController.userLogin);

router.post('/meetups/:meetupId/images', meetupController.addImage);
router.post('/meetups/:meetupId/tags', jwt,meetupController.addTag);
router.post('/comments', jwt, questionController.addComment);

router.all('*', (req, res) => {
   res.json({
      status: 404,
      error: 'Incorrect API endpoint;  Preceed your API endpoint with API please check your api URL (even for as little thing as spelling)'
   });
})
 

export default router;