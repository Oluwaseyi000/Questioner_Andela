import pool from './db_connect';

/**
 * Create Rsvp Table
 */

const Rsvps =
   pool.query(`CREATE TABLE IF NOT EXISTS Rsvps(
      id serial PRIMARY KEY,
      userId integer NOT NULL  REFERENCES users(id),
      meetupId integer NOT NULL  REFERENCES meetups(id),
      response  VARCHAR(20) NOT NULL,
      unique(userid, meetupid)
      )`)
   .catch(err=>{
      console.log(err);
      //  pool.end();
   });

export default Rsvps;
