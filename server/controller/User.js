import bcrypt from 'bcrypt-nodejs';
import Rsvps from '../model/Rsvps';
import Meetups from '../model/Meetup';
import User from '../model/User';
import Votes from '../model/Vote';
import Pool from '../model/db_connect';
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

      const text = `INSERT INTO users(firstname, lastName, email, phoneNumber, othername, registered, isadmin, password) VALUES($1, $2, $3,$4, $5, $6, $7, $8) returning id, email, firstname, isadmin, lastname`;

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

      Pool.query(text, value)
         .then((user) => {
            const userDetail = user.rows[0];
            jwt.sign({
               userDetail
            }, 'secretkey', (err, token) => {
               if (err) {
                 
               } else {
                  return res.status(200).json({
                     status: 200,
                     message: "New user created successfully",
                     data: [{
                                    token: token,
                                    user: {
                                    firstname:user.rows[0].firstname,
                                    lastname:user.rows[0].lastname,
                                    email:user.rows[0].email, 
                                    adminStatus: user.rows[0].isadmin
                                 },
                                 }]


                  })
               }
            })

         })
         .catch((err) => {
            return res.status(400).json({
               status: 400,
               message: "email already taken, choose another email"
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

      Pool.query(text2, value)
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


         const value = [
            res.authData.userDetail.id,
            req.params.meetupId,
            req.body.status
         ]

         return res.json({
            status: 200,
            data: {
               message: "Your rsvp  is successful",
               meetupId: req.params.meetupId,
               userId: res.authData.userDetail.id,
               status: req.body.status
            }
         })

         //    const text = `INSERT INTO rsvps(userId, meetupId, response) VALUES($1, $2, $3) RETURNING response`;

         // Pool.query(text, value)
         //    .then((rsvp) => {

         //       return res.json({
         //       status: 201,
         //       message: 'RSVP successfully created ',
         //       data: {
         //          id: rsvp.id,
         //          status: rsvp.response
         //       },
         //    })

         //    })


      }
   }
}
export default userController;