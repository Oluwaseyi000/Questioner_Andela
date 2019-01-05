let express = require('express');
let router = express.Router();

let meetupController = require('./controller/Meetup');


router.post('/meetups', meetupController.createMeetup);




router.route('*')
   .get((req, res) => {
      res.json({
         status: 404,
         message: 'Incorrect API endpoint; please check your api URL (even for as little thing as spelling)'
      });
   })

   .post((req, res) => {
      res.json({
         status: 404,
         message: 'Incorrect API endpoint, please check your api  URL(preceed your request url with api/v1)'
      });
   })
   .put((req, res) => {
      res.json({
         status: 404,
         message: 'Incorrect API endpoint, please check your api URL (preceed your request url with api/v1)'
      });
   })
   .delete((req, res) => {
      res.json({
         status: 404,
         message: 'Incorrect API endpoint, please check your api  URL(preceed your request url with api/v1)'
      });
   });

module.exports = router;