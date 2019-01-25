import pool from './db_connect';

/**
 * Create Vote Table
 */
const Vote = 
   pool.query(`CREATE TABLE IF NOT EXISTS Votes(
         id serial PRIMARY KEY,
         questionId VARCHAR(40) NOT NULL,
         voteType VARCHAR(10) NOT NULL,
         createdOn TIMESTAMP
         )`)
   .catch(err=>{
      console.log(err);
      // pool.end();
   });

export default Vote;
