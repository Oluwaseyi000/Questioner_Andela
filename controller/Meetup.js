let Meetups = require('../model/Meetup');

createMeetup = (req, res) => {
   let tags = req.body.tags instanceof Array ? req.body.tags : [req.body.tags]
   const newMeetup = {
      id: Date.now(),
      topic: req.body.topic,
      location: req.body.location,
      happeningOn: req.body.happeningOn,
      tag: tags || null,
      details: req.body.details || null,
      coverImage: req.body.coverImage || null,
      host: req.body.host || null, 
      createdOn: new Date()
   }

   if (!newMeetup.topic || !newMeetup.location || !newMeetup.happeningOn) {
      res.json({
         status: 400,
         error: 'Bad request error, missing required data. Note: topic, location and happeningOn are required'

      })
   } else {


      Meetups.push(newMeetup);
      res.json({
         status: 201,
         message: 'New meetup successfully created ',
         data: [newMeetup]
      })
   }
}

getASpecificMeetupRecord = (req, res) => {

   if (!req.params.meetupId) {
      res.json({
         status: 400,
         data: [Meetups],
         error: 'Bad Request, please include meetup Id in your request as parameter'
      })
   } else {
      const meetup = Meetups.find((meetup) => meetup.id === Number(req.params.meetupId));
      if (meetup) {
         res.json({
            status: 200,
            data: [meetup]
         })
      } else {
         res.json({
            status: 204,
            message: `Request successful but result contains no data, no meetup record found for id ${req.params.meetupId}`,
            data: []
         })
      }

   }


}

getAllMeetupsRecord = (req, res) => {
   if (Meetups.length > 0) {
      res.json({
         status: 200,
         data: Meetups
      })
   } else {
      res.json({
         status: 204,
         message: 'Request successful but result contains no data, probably no meetup records',
         data: []
      })
   }
}

upcomingMeetups = (req, res) => {
   const meetup = Meetups.filter(meetup => (new Date(meetup.happeningOn) > new Date()));
   if (meetup.length > 0) {
      res.json({
         status: 200,
         data: meetup,

      })
   } else {
      res.json({
         status: 204,
         message: 'Request successful but result contains no data, probably no upcoming meetup',
         data: [],

      })
   }

}

deleteMeetup = (req, res) => {

   if (!req.params.meetupId) {
      res.json({
         status: 400,
         error: 'meetup id not included, please add meetup id'
      })
   } else {
      const meetup = Meetups.findIndex((meetup) => meetup.id === Number(req.params.meetupId));

      if (meetup === -1) {
         res.json({
            status: 404,
            error: `Request unsuccessful, meetup for id ${req.params.meetupId} not found`
         })

      } else {
         Meetups.splice(meetup, 1);
         res.json({
            status: 204,
            message: `Delete Successful. Meetup with id ${req.params.meetupId} successfully deleted`
         })
      }
   }
}

module.exports = {
   createMeetup,
   getASpecificMeetupRecord,
   getAllMeetupsRecord,
   upcomingMeetups,
   deleteMeetup
}