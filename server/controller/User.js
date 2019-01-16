import bcrypt from 'bcrypt-nodejs';
import Rsvps from '../model/Rsvps';
import Meetups from '../model/Meetup';
import Votes from '../model/Vote';
import Pool from '../model/db_connect';
import moment from 'moment';
import jwt from 'jsonwebtoken';

class userController {

   /**
    * Create A user signup
    * @param {object} req 
    * @param {object} res
    * @returns {object} user object 
    */
   static userSignup(req, res) {

      const text = `INSERT INTO users(firstname, lastName, email, phoneNumber, othername, registered, isadmin, password) VALUES($1, $2, $3,$4, $5, $6, $7, $8) returning id`;

      const value = [
         req.body.firstname,
         req.body.lastname,
         req.body.email,
         req.body.phonenumber,
         req.body.othername,
         moment(new Date()),
         false,
         bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
      ];
      
      Pool.query(text, value)
         .then((user) => {
            jwt.sign({user}, 'secretkey', (err, token)=>{
               if(err){console.log(err)}else{
               return res.status(200).json({
                  status: 200,
                  token,
                  message: 'New user successfull added',
                 
                  
               })}
            })
            
         })
         .catch((err) => {
            return res.status(400).json({
               status: 400,
               message: err
            })

         })


   }

   /**
    * Login user 
    * @param {object} req 
    * @param {object} res
    * @returns {object} user object 
    */
   static userLogin(req, res) {
     
      const text2 = `SELECT * FROM users WHERE email=$1 AND password=$2`;
     
      const text = `SELECT * FROM users`;

      const value = [
            req.body.email,
           bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))]
           ;
      
      Pool.query(text2, value)
         .then(
            (user) => {
              if(user.rows.length>0){
               jwt.sign({user}, 'secretkey', (err, token)=>{
                  if(err){console.log(err)}else{
                     return res.status(200).json({
                  status: 200,
                  token,
                  message: 'User successfully sign in',               
               }) 
                }
               })
               }else{
                  return res.status(404).json({
                     status:404,
                     error: 'no user found'})
               }
            

           
            
         })
         .catch((err) => {
            return res.status(400).json({
               status: 400,
               ER: 'error',
               message: err
            })

         })


   }

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
export default userController;