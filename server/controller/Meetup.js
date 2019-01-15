import Meetups from '../model/Meetup';
import jwt from 'jsonwebtoken';
class Meetup {
   /**
    * Create A Meetup
    * @param {object} req 
    * @param {object} res
    * @returns {object} meetup object 
    */
   static createMeetup(req, res) {
      const tags = req.body.tags instanceof Array ? req.body.tags : [req.body.tags]
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
         return res.status(400).json({
            status: 400,
            error: 'Bad request error, missing required data. Note: topic, location and happeningOn are required'

         })
      } else {
         Meetups.push(newMeetup);
         return res.status(201).json({
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
         return res.status(400).json({
            status: 400,
            error: 'Bad Request, please include meetup Id in your request as parameter'
         })
      } else {
         const meetup = Meetups.find((meetup) => meetup.id === Number(req.params.meetupId));

         return res.status(200).json({
            status: 200,
            data: meetup
         })
      }
   }

   static getAllMeetupsRecord(req, res) {
      /**
       * Get All Meetups
       * @param {object} req 
       * @param {object} res
       * @returns {object} array of meetup objects
       */
      const token = req.headers['x-access-token'];
      jwt.verify(req.token, 'secretkey', (err, authData)=>{
         if(err){
            console.log(req);
            
            return res.status(403).json({
               status: 403,
               message: 'access forbiden, wrong token',
               err,
            })
         }
         else{
            return res.status(200).json({
               status: 200,
               data: Meetups, 
               // authData
            })
         }
      })
      
   }
   static upcomingMeetups(req, res) {
      /**
       * Get Upcoming Meetup
       * @param {object} req 
       * @param {object} res
       * @returns {object} meetup object 
       */
      const meetup = Meetups.filter(meetup => (new Date(meetup.happeningOn) > new Date()));

      return res.status(200).json({
         status: 200,
         data: meetup,

      })
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
            return res.status(404).json({
               status: 404,
               error: `Request unsuccessful, meetup for id ${req.params.meetupId} not found`
            })
         } else {
            Meetups.splice(meetup, 1);
            return res.status(200).json({
               status: 200,
               message: `Delete Successful. Meetup with id ${req.params.meetupId} successfully deleted`
            })
         }
      }
   }
}

export default Meetup;