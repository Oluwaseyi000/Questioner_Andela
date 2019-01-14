import pool from './db_connect';

/**
 * Create Rsvp Table
 */

const Rsvps =
   pool.query(`CREATE TABLE IF NOT EXISTS Rsvps(
      id UUID PRIMARY KEY,
      userId VARCHAR(40) NOT NULL,
      meetupId VARCHAR(40) NOT NULL,
      response  VARCHAR(10) NOT NULL
      )`)
   .catch(err=>{
      console.log(err);
      pool.end();
   });

export default Rsvps;
