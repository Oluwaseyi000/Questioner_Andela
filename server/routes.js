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
router.put('/questions/:questionId/upvote', userLoggedIn, questionController.upvote);
router.put('/questions/:questionId/downvote', userLoggedIn, questionController.downvote);
router.get('/meetups/:meetupId/questions', userLoggedIn, questionController.getASpecificQuestionRecord);
router.get('/questions/:questionId/comments', userLoggedIn, questionController.getASpecificCommentRecord);

router.post('/auth/signup', userMiddleware.userSignup, userController.userSignup);

router.post('/auth/login', userMiddleware.userLogin, userController.userLogin);


router.post('/meetups/:meetupId/images', userLoggedIn, meetupController.addImage);
router.post('/meetups/:meetupId/tags', userLoggedIn, meetupController.addTag);
router.post('/comments', userLoggedIn, commentController.addComment);
router.patch('/user/reset-password', userLoggedIn, userController.resetPassword);
router.get('/question/:quesId/upcount', userLoggedIn, questionController.getUpvoteCount);
router.get('/question/:quesId/downcount', userLoggedIn, questionController.downUpvoteCount);

router.get('/', (req, res) => {
  res.json({
    status: 200,
    message: 'Welcome to Questioner API',
  });
});
router.all('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Incorrect API endpoint;  Preceed your API endpoint with API please check your api URL (even for as little thing as spelling)',
  });
});


export default router;
