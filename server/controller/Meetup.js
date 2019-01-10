import Meetups from '../model/Meetup';

class Meetup {

   /**
    * Create A Meetup
    * @param {object} req 
    * @param {object} res
    * @returns {object} meetup object 
    */
   static createMeetup(req, res) {
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
         return res.json({
            status: 400,
            error: 'Bad request error, missing required data. Note: topic, location and happeningOn are required'

         })
      } else {
         Meetups.push(newMeetup);
         return res.json({
            status: 201,
            message: 'New meetup successfully created ',
            data: [newMeetup]
         })
      }
   }

   static getASpecificMeetupRecord(req, res) {

      /**
       * Get A Meetup
       * @param {object} req 
       * @param {object} res
       * @returns {object} meetup object 
       */

      if (!req.params.meetupId) {
         return res.json({
            status: 400,
            error: 'Bad Request, please include meetup Id in your request as parameter'
         })
      } else {
         const meetup = Meetups.find((meetup) => meetup.id === Number(req.params.meetupId));
         if (meetup) {
            return res.json({
               status: 200,
               data: [meetup]
            })
         } else {
            return res.json({
               status: 200,
               message: `Request successful but result contains no data, no meetup record found for id ${req.params.meetupId}`,
               data: []
            })
         }

      }


   }

   static getAllMeetupsRecord(req, res) {

      /**
       * Get All Meetup
       * @param {object} req 
       * @param {object} res
       * @returns {object} array of meetup objects
       */

      if (Meetups.length > 0) {
         return res.json({
            status: 200,
            data: Meetups
         })
      } else {
         return res.json({
            status: 200,
            message: 'Request successful but result contains no data, probably no meetup records',
            data: []
         })
      }
   }

   static upcomingMeetups(req, res) {

      /**
       * Get Upcoming Meetup
       * @param {object} req 
       * @param {object} res
       * @returns {object} meetup object 
       */
      const meetup = Meetups.filter(meetup => (new Date(meetup.happeningOn) > new Date()));
      if (meetup.length > 0) {
         return res.json({
            status: 200,
            data: meetup,

         })
      } else {
         return res.json({
            status: 200,
            message: 'Request successful but result contains no data, probably no upcoming meetup',
            data: [],

         })
      }

   }

   static deleteMeetup(req, res) {

      /**
       * Delete A Meetup
       * @param {object} req 
       * @param {object} res
       * @returns {object} return status code 204 
       */

      if (!req.params.meetupId) {
         return res.json({
            status: 400,
            error: 'meetup id not included, please add meetup id'
         })
      } else {
         const meetup = Meetups.findIndex((meetup) => meetup.id === Number(req.params.meetupId));

         if (meetup === -1) {
            return res.json({
               status: 404,
               error: `Request unsuccessful, meetup for id ${req.params.meetupId} not found`
            })

         } else {
            Meetups.splice(meetup, 1);
            return res.json({
               status: 204,
               message: `Delete Successful. Meetup with id ${req.params.meetupId} successfully deleted`
            })
         }
      }
   }


}

export default Meetup;