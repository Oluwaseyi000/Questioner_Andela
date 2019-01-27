import bcrypt from 'bcrypt-nodejs';
import Rsvps from '../model/Rsvps';
import Meetups from '../model/Meetup';
import User from '../model/User';
import Votes from '../model/Vote';
import pool from '../model/db_connect';
import moment from 'moment';
import Authenticate from '../middleware/authorize';
import images from '../model/Images';
import tags from '../model/Tags';

const confirmToken = Authenticate.confirmToken;
import jwt from 'jsonwebtoken';

class userController {

   /**
    * Create A user signup
    * @param {object} req 
    * @param {object} res
    * @returns {object} user object 
    */
   static userSignup(req, res) {

      const text = `INSERT INTO users(firstname, lastName, email, phoneNumber, othername, registered, isadmin, password) VALUES($1, $2, $3,$4, $5, $6, $7, $8) returning id, email, firstname, lastname, isadmin`;

      const value = [
         req.body.firstname,
         req.body.lastname,
         req.body.email,
         req.body.phonenumber,
         req.body.othername,
         new Date(),
         false,
         bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
      ];

      pool.query(text, value)
         .then((user) => {
            const userDetail = user.rows[0];
            jwt.sign({
               userDetail
            }, 'secretkey', (err, token) => {
               if (err) {
                  console.log(err)
               } else {
                  return res.status(201).json({
                     status: 201,
                     message: "New user created successfully",
                     data: [{
                                    token: token,
                                    user: {
                                   
                                    firstname:user.rows[0].firstname,
                                    lastname:user.rows[0].lastname,
                                    email:user.rows[0].email, 
                                    isadmin: user.rows[0].isadmin
                                 },
                                 }]


                  })
               }
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

      const text2 = `SELECT id,password,firstname,lastname, email, isadmin FROM users WHERE email=$1`;


      const value = [
         req.body.email,
      ];

      pool.query(text2, value)
         .then(
            (user) => {
               if (user.rows.length > 0) {
                  
                  const userDetail = user.rows[0];
                  bcrypt.compare(req.body.password, user.rows[0].password, (err, authPwd) => {
                     
                     if (authPwd) {
                        jwt.sign({
                           userDetail
                        }, 'secretkey', (err, token) => {
                           if (err) {
                           } else {
                              return res.status(200).json({
                                 status: 200,
                                 message: "User logged in successfully",
                                 data: [{
                                    token: token,
                                    user: {
                                    firstname:user.rows[0].firstname,
                                    lastname:user.rows[0].lastname,
                                    email:user.rows[0].email,
                                    adminStatus:user.rows[0].isadmin,
                                 },
                                 }]
                              })
                           }
                        })
                     } else {
                        return res.status(401).json({
                           status: 401,
                           error: 'wrong login credentials'
                        })
                     }
                  })

               } else {
                  return res.status(401).json({
                     status: 401,
                     error: 'wrong login credentials'
                  })
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
      confirmToken(req, res);
      if (!req.body.status || !req.params.meetupId) {
         return res.status(400).json({
            status: 400,
            error: 'Bad request error, missing required data. Note: status is require'
         })
      } else {
         const text = `INSERT INTO rsvps(userId, meetupId, response) VALUES($1, $2, $3) RETURNING response`;

         const value = [
            res.authData.userDetail.id,
            req.params.meetupId,
            req.body.status
         ]
             pool.query(text, value)
          //  .catch((error) => {//
               // if(res.status===409){
               //    return res.status(409).json({
               //          status: 409,
               //          error2: 'RSVP already exist for user'
               //       }
                     
               //    )
               // }
               // else{
                  const text3 = `SELECT id, topic FROM meetups WHERE id=$1`;
                  const value3 = [req.params.meetupId];
                        
                  pool.query(text3, value3)
                     .then(meetup => {
                        console.log('rrssss');
                        return res.status(201).json({
                           status:201,
                           message: 'RSVP successfully created',
                           data:[{
                              meetup: meetup.rows[0].id,
                              topic: meetup.rows[0].topic,
                              status: req.body.status
                           }]
                        })
                     })
                     .catch(error => {
                        return res.status(404).json({
                           error:'meetup  do not exit'
                        })
                     })
               // }
           // });


       

      }
   }

   static resetPassword(req, res) {

      confirmToken(req, res);

      if (!req.body.userId ||!req.body.newPwd) {
         return res.status(400).json({
            status: 400,
            error: 'Bad Request, please include user Id and new password in your request as parameter'
         })
      } else {

      const text = `UPDATE users SET password=$1 where id=$2 RETURNING firstname, email`;

      const value = [
         bcrypt.hashSync(req.body.newPwd, bcrypt.genSaltSync(10)),
         req.body.userId
      ];

      pool.query(text, value)
         .then(user=>{
            return res.status(200).json({
               status:200,
               message:'password successfully changed',
               data:{
                  firstname: user.rows[0].firstname,
                  email: user.rows[0].email
               }
            })
         })
         .catch(err=>{
            return res.status(400).json({
               error: 'no user found',
               err})
         })
      }

   }
}
export default userController;