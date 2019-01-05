let Rsvps = require('../model/Rsvps');
let Meetups=require('../model/Meetup')

rsvps = (req, res) => {
   const meetup = Meetups.find((meetup) => meetup.id === Number(req.params.meetupId));
   if (!req.body.userId || !req.params.meetupId || !req.body.status) {
      res.json({
         status: 400,
         error: 'Bad request error, missing required data. Note: userId, meetupId and status are required'
      })
   } else if(!meetup){
      res.json({
         status: 204,
         error: 'no meetup record for the specified id, wrong meetup id',
         Rsvps: Meetups
      })
   }else {
      const rsvp = {
         id: Date.now(),
         userId: req.body.userId,
         meetupId: req.params.meetupId,
         topic:meetup.topic,
         status: req.body.status, 
         createdOn: new Date()
      }
   
      Rsvps.push(rsvp);
      res.json({
         status: 201,
         message: 'RSVP successfully created ',
         data: [{
            meetup:rsvp.meetupId,
            topic:rsvp.topic,
            status:rsvp.status
         }],
         
      })
   }
}

module.exports={
   rsvps
}