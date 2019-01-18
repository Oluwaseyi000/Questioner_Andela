import pool from './db_connect';

/**
 * Create Meetup Table
 */
const Comments =
   pool.query(`CREATE TABLE IF NOT EXISTS comments(
   id serial PRIMARY KEY,
   userId  INTEGER NOT NULL,
   meetupId INTEGER NOT NULL,
   title TEXT,
   BODY TEXT,
   createdOn TIMESTAMP, 
   updatedOn DATE
    )`)
   .catch(err=>{
      console.log(err);
    //  pool.end();
   });

export default Comments;