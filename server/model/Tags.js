import pool from './db_connect';

/**
 * Create Tags Table
 */
const Tags =
   pool.query(`CREATE TABLE IF NOT EXISTS tags(id serial PRIMARY KEY,
   meetupId INTEGER REFERENCES meetups(id), 
   tags  TEXT NOT NULL
    )`);

export default Tags;