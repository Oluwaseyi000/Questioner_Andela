let Meetups = require('../model/Meetup');

createMeetup = (req, res) => {
   const newMeetup = {
      id: Date.now(),
      topic: req.body.topic,
      location: req.body.location,
      happeningOn: req.body.happeningOn,
      tag: [req.body.tags ||null],
      details: req.body.details || null,
      coverImage: req.body.coverImage||null,
      host: req.body.host ||null
   }
  
   if ( !newMeetup.topic || !newMeetup.location || !newMeetup.happeningOn) {
      res.json({
         status: 400,
         error: 'Bad request error, missing required data. Note: topic, location and happeningOn are required'

      })
   } 
   else {
   

      Meetups.push(newMeetup);
      res.json({
         status: 201,
         message: 'New meetup successfully created ',
         data: [newMeetup]
      })
   }
}



module.exports = {createMeetup}