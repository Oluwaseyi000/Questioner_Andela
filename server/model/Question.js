import pool from './db_connect';
/**
 * Create Question Table
 */
const Questions =
   pool.query(`CREATE TABLE IF NOT EXISTS questions(
   id serial PRIMARY KEY,
   createdBy integer NOT NULL REFERENCES users(id),
   meetupId  integer NOT NULL REFERENCES meetups(id),
   title VARCHAR(70),
   body TEXT NOT NULL,
   vote INTEGER
    )`)
   .catch(err=>{
      console.log(err);
      // pool.end();
   });

export default Questions;
