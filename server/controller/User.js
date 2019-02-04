/* eslint-disable consistent-return */
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
<<<<<<< HEAD
import dotenv from 'dotenv';
import pool from '../model/db_connect';

dotenv.config();

class userController {
=======
import pool from '../model/db_connect';
import Authenticate from '../middleware/authorize';

const confirmToken = Authenticate.confirmToken;

class userController {

>>>>>>> consume API
  /**
    * Create A user signup
    * @param {object} req
    * @param {object} res
    * @returns {object} user object
    */
<<<<<<< HEAD
<<<<<<< HEAD
  static userSignup(req, res) {
    const text = 'INSERT INTO users(firstname, lastName, email, phoneNumber, othername, registered, isadmin, password) VALUES($1, $2, $3,$4, $5, $6, $7, $8) returning id, firstname, lastname, isadmin';
=======
  static userSignup(req, res) {

    const text = 'INSERT INTO users(firstname, lastName, email, phoneNumber, othername, registered, isadmin, password) VALUES($1, $2, $3,$4, $5, $6, $7, $8) returning id, email, firstname, lastname, isadmin';
>>>>>>> consume API

    const value = [
      req.body.firstname,
      req.body.lastname,
      req.body.email,
      req.body.phonenumber,
      req.body.othername,
      new Date(),
      false,
      bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
    ];

    pool.query(text, value)
      .then((user) => {
        const userDetail = user.rows[0];
        jwt.sign({
          userDetail,
<<<<<<< HEAD
        }, process.env.SECRET, (err, token) => {
          if (err) {
            res.json({ err });
=======
        }, 'secretkey', (err, token) => {
          if (err) {
            console.log(err);
>>>>>>> consume API
          } else {
            return res.status(201).json({
              status: 201,
              message: 'New user created successfully',
              data: [{
                token,
                user: {
<<<<<<< HEAD
                  firstname: userDetail.firstname,
                  lastname: userDetail.lastname,
                  email: userDetail.email,
                  isadmin: userDetail.isadmin,
                },
              }],
=======
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

                           firstname: user.rows[0].firstname,
                           lastname: user.rows[0].lastname,
                           email: user.rows[0].email,
                           isadmin: user.rows[0].isadmin
                        },
                     }]
=======
                  userId: userDetail.id,
                  firstname: user.rows[0].firstname,
                  lastname: user.rows[0].lastname,
                  email: user.rows[0].email,
                  isadmin: user.rows[0].isadmin,
                },
              }],
>>>>>>> consume API


            });
          }
        });

      })
      .catch(err => res.status(400).json({
        status: 400,
        message: err,
      }));


  }

  /**
    * Login user
    * @param {object} req
    * @param {object} res
<<<<<<< HEAD
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
                           if (err) {} else {
                              return res.status(200).json({
                                 status: 200,
                                 message: "User logged in successfully",
                                 data: [{
                                    token: token,
                                    user: {
                                       firstname: user.rows[0].firstname,
                                       lastname: user.rows[0].lastname,
                                       email: user.rows[0].email,
                                       adminStatus: user.rows[0].isadmin,
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

>>>>>>> consuming


            });
          }
        });
      })
      .catch(err => res.status(400).json({
        status: 400,
        message: err,
      }));
  }

  /**
    * Login user
    * @param {object} req
    * @param {object} res
    * @returns {object} user object
    */
<<<<<<< HEAD
  static userLogin(req, res) {
    const text2 = 'SELECT id,password,firstname,lastname, email, isadmin FROM users WHERE email=$1';

=======
    * @returns {object} user object
    */
  static userLogin(req, res) {

    const text2 = 'SELECT id,password,firstname,lastname, email, isadmin FROM users WHERE email=$1';


>>>>>>> consume API
    const value = [
      req.body.email,
    ];

    pool.query(text2, value)
      .then(
        (user) => {
          if (user.rows.length > 0) {
<<<<<<< HEAD
            const userDetail = {
              id: user.rows[0].id,
              firstname: user.rows[0].firstname,
              lastname: user.rows[0].lastname,
              isadmin: user.rows[0].isadmin,
            };
            bcrypt.compare(req.body.password, user.rows[0].password, (err, authPwd) => {
              if (authPwd) {
                jwt.sign({
                  userDetail,
                }, process.env.SECRET, (error, token) => {
                  if (error) {
                    return res.status(204).json({ error });
                  }
                  return res.status(200).json({
                    status: 200,
                    message: 'User logged in successfully',
                    data: [{
                      token,
                      user: {
                        firstname: userDetail.firstname,
                        lastname: userDetail.lastname,
                        email: userDetail.email,
                        adminStatus: userDetail.isadmin,
                      },
                    }],
                  });
                });
              } else {
                return res.status(401).json({
                  status: 401,
                  error: 'wrong login credentials',
                });
              }
            });
          } else {
            return res.status(401).json({
              status: 401,
              error: 'wrong login credentials',
            });
          }
        },
      )
      .catch(err => res.status(400).json({
        status: 400,
        ER: 'error',
        message: err,
      }));
  }

  static resetPassword(req, res) {
    if (!req.body.userId || !req.body.newPwd) {
      return res.status(400).json({
        status: 400,
        error: 'Bad Request, please include user Id and new password in your request as parameter',
      });
    }

    const text = 'UPDATE users SET password=$1 where id=$2 RETURNING firstname, email';

    const value = [
      bcrypt.hashSync(req.body.newPwd, bcrypt.genSaltSync(10)),
      req.body.userId,
    ];

    pool.query(text, value)
      .then(user => res.status(200).json({
        status: 200,
        message: 'password successfully changed',
        data: {
          firstname: user.rows[0].firstname,
          email: user.rows[0].email,
        },
      }))
      .catch(err => res.status(400).json({
        error: 'no user found',
        err,
      }));
  }
=======
=======
>>>>>>> consume API

            const userDetail = user.rows[0];
            bcrypt.compare(req.body.password, user.rows[0].password, (err, authPwd) => {

              if (authPwd) {
                jwt.sign({
                  userDetail,
                }, 'secretkey', (err, token) => {
                  if (err) {} else {
                    return res.status(200).json({
                      status: 200,
                      message: 'User logged in successfully',
                      data: [{
                        token,
                        user: {
                          userId: userDetail.id,
                          firstname: user.rows[0].firstname,
                          lastname: user.rows[0].lastname,
                          email: user.rows[0].email,
                          adminStatus: user.rows[0].isadmin,
                        },
                      }],
                    });
                  }
                });
              } else {
                return res.status(401).json({
                  status: 401,
                  error: 'wrong login credentials',
                });
              }
            });

          } else {
            return res.status(401).json({
              status: 401,
              error: 'wrong login credentials',
            });
          }


<<<<<<< HEAD
         const text3 = `SELECT id, topic FROM meetups WHERE id=$1`;
         const value3 = [req.params.meetupId];

         pool.query(text3, value3)
            .then(meetup => {
               return res.status(201).json({
                  status: 201,
                  message: 'RSVP successfully created',
                  data: [{
                     meetup: meetup.rows[0].id,
                     topic: meetup.rows[0].topic,
                     status: req.body.status
                  }]
               })
            })
            .catch(error => {
               return res.status(404).json({
                  error: 'meetup  do not exit'
               })
            })

      }
   }

   static resetPassword(req, res) {

      confirmToken(req, res);

      if (!req.body.userId || !req.body.newPwd) {
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
            .then(user => {
               return res.status(200).json({
                  status: 200,
                  message: 'password successfully changed',
                  data: {
                     firstname: user.rows[0].firstname,
                     email: user.rows[0].email
                  }
               })
            })
            .catch(err => {
               return res.status(400).json({
                  error: 'no user found',
               })
            })
      }

   }
>>>>>>> consuming
=======


        },
      )
      .catch(err => res.status(400).json({
        status: 400,
        ER: 'error',
        message: err,
      }));


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
        error: 'Bad request error, missing required data. Note: status is require',
      });
    }
    const text = 'INSERT INTO rsvps(userId, meetupId, response) VALUES($1, $2, $3) RETURNING response';

    const value = [
      res.authData.userDetail.id,
      req.params.meetupId,
      req.body.status,
    ];
    pool.query(text, value)
      .then(response=>res.json({
        response
      }))
      // .catch((err)=>{
      //   const update= 'UPDATE rsvps set response=$3 where userid=$1 AND meetupid=$2';
      //   pool.query(text, value)
      //   .then(resp=>res.json({
      //       resp
      //   }))
      // });
      .catch(err=>{
        // const update= 'UPDATE rsvps set response=$3 where userid=$1 AND meetupid=$2';
        //   pool.query(text, value)
        res.json({
          message: 'rsvp already exist'
        })
      })


    // const text3 = 'SELECT id, topic FROM meetups WHERE id=$1';
    // const value3 = [req.params.meetupId];

    // pool.query(text3, value3)
    //   .then(meetup => res.status(201).json({
    //     status: 201,
    //     message: 'RSVP successfully created',
    //     data: [{
    //       meetup: meetup.rows[0].id,
    //       topic: meetup.rows[0].topic,
    //       status: req.body.status,
    //     }],
    //   }))
    //   .catch(() => res.status(404).json({
    //     error: 'meetup  do not exit',
    //   }));


  }

  static resetPassword(req, res) {

    confirmToken(req, res);

    if (!req.body.userId || !req.body.newPwd) {
      return res.status(400).json({
        status: 400,
        error: 'Bad Request, please include user Id and new password in your request as parameter',
      });
    }

    const text = 'UPDATE users SET password=$1 where id=$2 RETURNING firstname, email';

    const value = [
      bcrypt.hashSync(req.body.newPwd, bcrypt.genSaltSync(10)),
      req.body.userId,
    ];

    pool.query(text, value)
      .then(user => res.status(200).json({
        status: 200,
        message: 'password successfully changed',
        data: {
          firstname: user.rows[0].firstname,
          email: user.rows[0].email,
        },
      }))
      .catch(() => res.status(400).json({
        error: 'no user found',
      }));


  }
>>>>>>> consume API
}
export default userController;
