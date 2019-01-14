import pool from './db_connect';

/**
 * Create Meetup Table
 */
const Meetups = 
   pool.query(`CREATE TABLE IF NOT EXISTS Votes(
         id UUID PRIMARY KEY,
         questionId VARCHAR(40) NOT NULL,
         voteType VARCHAR(10) NOT NULL,
         createdOn TIMESTAMP
         )`)
   .catch(err=>{
      console.log(err);
      // pool.end();
   });

export default Meetups;
