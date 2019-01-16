import pool from '../model/db_connect';
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

      pool.query(text, value)
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

      pool.query(text)
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
      confirmToken(req, res);
      const text = `SELECT * FROM meetups WHERE happeningOn>=$1`;
      const value = [new Date()];

      pool.query(text, value)
      .then(meetup => {
               return res.status(200).json({
                  status: 200,
                  data: meetup.rows
               })
         })

   }
   static deleteMeetup(req, res) {

      /**
       * Delete A Meetup
       * @param {object} req 
       * @param {object} res
       * @returns {object} return status code 204 
       */

      confirmToken(req, res);

      const text = `DELETE FROM meetups WHERE id=$1`;
      const value = [req.params.meetupId];

      pool.query(text, value)
      .then(()=>{
               return res.status(200).json({
                  status: 200,
                  message: 'meetup deleted'
               })

         })
      }
}

export default Meetup;