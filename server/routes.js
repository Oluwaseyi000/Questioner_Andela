import express from 'express';
import questionController from './controller/Question';
import userController from './controller/User';
import meetupController from './controller/Meetup';
import commentController from './controller/Comment';

import userMiddleware from './middleware/User';
import meetupMiddleware from './middleware/Meetup';
import authorize from './middleware/authorize';
import questionMiddleware from './middleware/Question';

const userLoggedIn = authorize.verifyToken;

const router = express.Router();

router.get('/meetups/upcomingmeetups', userLoggedIn, meetupController.upcomingMeetups);
router.post('/meetups', userLoggedIn, meetupMiddleware.createMeetup, meetupController.createMeetup);
router.get('/meetups/:meetupId', userLoggedIn, meetupMiddleware.getASpecificMeetupRecord, meetupController.getASpecificMeetupRecord);
router.get('/meetups', userLoggedIn, meetupController.getAllMeetupsRecord);
router.delete('/meetups/:meetupId', userLoggedIn, meetupMiddleware.deleteMeetup, meetupController.deleteMeetup);
router.post('/meetups/:meetupId/rsvps', userLoggedIn, meetupController.createRsvps);

router.post('/questions', userLoggedIn, questionMiddleware.createQuestion, questionController.createQuestion);
router.patch('/questions/:questionId/upvote', userLoggedIn, questionController.upvote);
router.patch('/questions/:questionId/downvote', userLoggedIn, questionController.downvote);

router.post('/auth/signup', userMiddleware.userSignup, userController.userSignup);

router.post('/auth/login', userMiddleware.userLogin, userController.userLogin);

router.post('/meetups/:meetupId/images', userLoggedIn, meetupController.addImage);
router.post('/meetups/:meetupId/tags', userLoggedIn, meetupController.addTag);
router.post('/comments', userLoggedIn, commentController.addComment);
router.patch('/user/reset-password', userLoggedIn, userController.resetPassword);


router.all('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Incorrect API endpoint;  Preceed your API endpoint with API please check your api URL (even for as little thing as spelling)',
  });
});


export default router;
