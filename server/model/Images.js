import pool from './db_connect';

/**
 * Create Tags Table
 */

const Images = pool.query(`CREATE TABLE IF NOT EXISTS images(
  id serial PRIMARY KEY,
   meetupId INTEGER REFERENCES meetups(id), 
   images  TEXT NOT NULL
    )`);

export default Images;
