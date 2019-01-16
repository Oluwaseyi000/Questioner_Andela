import Pool from '../model/db_connect';
import Meetups from '../model/Meetup';
import Authenticate from '../middleware/authorize';

const confirmToken = Authenticate.confirmToken;

class Meetup {
   /**
    * Create A Meetup
    * @param {object} req 
    * @param {object} res
    * @returns {object} meetup object 
    */
   static createMeetup(req, res) {

      confirmToken(req, res);

      const tags = req.body.tags instanceof Array ? req.body.tags.join(';') : req.body.tags

      const value = [
         req.body.topic,
         req.body.location,
         req.body.happeningOn,
         tags,
         req.body.details,
         req.body.image,
         req.body.host,
         new Date(),
         new Date()
      ]
      const text = `INSERT INTO meetups(topic, location, happeningOn, tags, details, images, host, createdOn, updatedOn) VALUES($1, $2, $3,$4, $5, $6, $7, $8, $9) returning id`;

      pool.query(text, value)
         .then(meetup => {
            return res.status(200).json({
               status: 200,
               message: 'New Meetup Created',
            })
         })
   }

   static getASpecificMeetupRecord(req, res) {
      /**
       * Get A Meetup
       * @param {object} req 
       * @param {object} res
       * @returns {object} meetup object 
       */
      confirmToken(req, res);

      const text = `SELECT * FROM meetups WHERE id=$1`;
      const value = [req.params.meetupId];

      Pool.query(text, value)
      .then(meetup => {
            if (meetup.rows.length > 0) {
               return res.status(200).json({
                  status: 200,
                  data: meetup.rows
               })

            } else {
               return res.status(404).json({
                  status: 404,
                  error: 'meetup not found'
               })
            }
         })
   }



   static getAllMeetupsRecord(req, res, next) {
      /**
       * Get All Meetups
       * @param {object} req 
       * @param {object} res
       * @returns {object} array of meetup objects
       */
      confirmToken(req, res);
      const text = `SELECT * FROM meetups`;

      Pool.query(text)
      .then(meetup => {
               return res.status(200).json({
                  status: 200,
                  data: meetup.rows
               })
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