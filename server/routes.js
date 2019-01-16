import express from 'express';
import questionController from './controller/Question';
import userController from './controller/User';
import meetupController from './controller/Meetup';

import userMiddleware from './middleware/User';
import authorize from './middleware/authorize';

let router = express.Router();

router.use('api/v1',  authorize.verifyToken);
router.get('/meetups/upcomingmeetups', meetupController.upcomingMeetups);
router.post('/meetups', meetupController.createMeetup);
router.get('/meetups/:meetupId', meetupController.getASpecificMeetupRecord);
router.get('/meetups', authorize.verifyToken, meetupController.getAllMeetupsRecord);
router.delete('/meetups/:meetupId', meetupController.deleteMeetup);

router.post('/questions', questionController.createQuestion);
router.patch('/questions/:questionId/upvote', questionController.voteQuestion);
router.patch('/questions/:questionId/downvote', questionController.voteQuestion);

router.post('/meetups/:meetupId/rsvps', userController.createRsvps);

router.post('/auth/signup', userMiddleware.userSignup,  userController.userSignup);

router.get('/auth/login', userMiddleware.userLogin,  userController.userLogin);

router.all('*', (req, res) => {
   res.json({
      status: 404,
      error: 'Incorrect API endpoint;  Preceed your API endpoint with API please check your api URL (even for as little thing as spelling)'
   });
})
 

export default router;