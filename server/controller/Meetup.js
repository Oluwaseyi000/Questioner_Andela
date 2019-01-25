import pool from '../model/db_connect';
import Meetups from '../model/Meetup';
import comments from '../model/Comment';
import Images from '../model/Images';
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

      if(res.authData.userDetail.isadmin){

         const tags = req.body.tags instanceof Array ? req.body.tags.join(';') : req.body.tags;

         const value = [
            req.body.topic,
            req.body.location,
            req.body.happeningOn,
            
            req.body.details,
        
            req.body.host,
            new Date(),
            new Date(),
         ]
         const text = `INSERT INTO meetups(topic, location, happeningOn,  details, host, createdOn, updatedOn) VALUES($1, $2, $3,$4, $5, $6, $7) returning id,topic, location, happeningOn`;
   
         pool.query(text, value)
            .then(meetup => {
               
               return res.status(201).json({
                  status: 201,
                  data: meetup.rows[0],
               })
            })
      }
           else{
              return res.status(403).json({
                 status:403,
                 error: 'authorize access, only admin can perform this action'
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
      confirmToken(req, res);

      const text = `SELECT * FROM meetups WHERE id=$1` ;
      const value = [req.params.meetupId];

      pool.query(text, value)
      .then(meetup => {
            if (meetup.rows.length > 0) {
               return res.status(200).json({
                  status: 200,
                  data: [meetup.rows[0]]
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
      if(res.authData.userDetail.isadmin){

         const text = `DELETE FROM meetups WHERE id=$1`;
         const value = [req.params.meetupId];
   
         pool.query(text, value)
         .then(()=>{
                  return res.status(200).json({
                     status: 200,
                     data: 'meetup successfully deleted'
                  })
   
            })
      }
      else{
         return res.status(403).json({
            status:403,
            error: 'authorize access, only admin can perform this action'
         })
      }

     
      }

      static addImage(req, res) {

         confirmToken(req, res);
   
         const images = req.body.image instanceof Array ? req.body.image.join(';') : req.body.image;
         const imageDisplay=req.body.image;
   
         const value = [
            req.body.meetupId,
            images
           
         ]
         const text = `INSERT INTO images(meetupId, images) VALUES($1, $2) returning id`;
   
         pool.query(text, value)
            .then(meetup => {
              
               return res.status(201).json({
                  status: 201,
                  data: meetup.rows[0],
               })
            })

         return res.json({
            status: 200,
            message: 'Images added successfully',
            meetupId: req.body.meetupId,
            images: req.body.images
         })
      }

     
   
         static addTag(req, res) {
            confirmToken(req, res);
            if (!req.body.tags || !req.body.meetupId) {
               return res.status(400).json({
                  status: 400,
                  error: 'Bad Request, please include meetup meetupid Id and tags in your request as parameter'
               })
            } else {
      
               const text = `SELECT id,topic FROM meetups WHERE id=$1`;
               const id = [req.body.meetupId];
      
               pool.query(text, id)
                  .then(meetup => {
                     return res.status(200).json({
                        status: 200,
                        data: {message: "tags added",
                        userId: res.authData.userDetail.id,
                        meetupId: req.body.meetupId,
                        tags: req.body.tags,}
                     })
                  })
            }
         }
}

export default Meetup;