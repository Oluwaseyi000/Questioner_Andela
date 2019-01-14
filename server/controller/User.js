import Rsvps from '../model/Rsvps';
import Meetups from '../model/Meetup';
import Users from '../model/User';
import Votes from '../model/Vote';

class userController {
   /**
    * Create A Rsvp
    * @param {object} req 
    * @param {object} res
    * @returns {object} rsvp object 
    */
   static createRsvps(req, res) {
      const meetup = Meetups.find((meetup) => meetup.id === Number(req.params.meetupId));
      if (!req.body.userId || !req.params.meetupId || !req.body.status) {
         return res.status(400).json({
            status: 400,
            error: 'Bad request error, missing required data. Note: userId, meetupId and status are required'
         })
      } else {
         const rsvp = {
            id: Date.now(),
            userId: req.body.userId,
            meetupId: req.params.meetupId,
            topic: meetup.topic,
            status: req.body.status,
            createdOn: new Date()
         }

         Rsvps.push(rsvp);
         return res.json({
            status: 201,
            message: 'RSVP successfully created ',
            data: [{
               meetup: rsvp.meetupId,
               topic: rsvp.topic,
               status: rsvp.status
            }],
         })
      }
   }
}
export default userController