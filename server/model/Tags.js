import pool from './db_connect';

/**
 * Create Tags Table
 */
const Tags =
   pool.query(`CREATE TABLE IF NOT EXISTS comments(id serial PRIMARY KEY,
   meetupId INTEGER, 
   tags  TEXT NOT NULL
    )`)
   .catch(err=>{
      console.log(err);
    //  pool.end();
   });

export default Tags;