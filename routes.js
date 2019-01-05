let express = require('express');
let router = express.Router();

let meetupController=require('./controller/Meetup');

router.get('/meetups/upcomingmeetups', meetupController.upcomingMeetups);
router.post('/meetups', meetupController.createMeetup);
router.get('/meetups/:meetupId', meetupController.getASpecificMeetupRecord);
router.get('/meetups', getAllMeetupsRecord);
router.delete('/meetups/:meetupId', meetupController.deleteMeetup);



router.route('/meetups')
   .delete((req, res) => {
      res.json({
         status: 400,
         error: 'Meetup id missing in DELETE request, please add meetup id to your request'
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