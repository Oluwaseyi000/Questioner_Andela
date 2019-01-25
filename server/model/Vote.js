import pool from './db_connect';

/**
 * Create Vote Table
 */
const Vote = 
   pool.query(`CREATE TABLE IF NOT EXISTS Votes(
         id serial PRIMARY KEY,
         questionId integer NOT NULL REFERENCES questions(id),
         voterId integer NOT NULL REFERENCES users(id),
         voteType VARCHAR(10) NOT NULL,
         createdOn TIMESTAMP,
         unique(questionId, voterId)
         )`)
   .catch(err=>{
      console.log(err);
      // pool.end();
   });

export default Vote;
