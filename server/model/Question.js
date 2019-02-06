import pool from './db_connect';
/**
 * Create Question Table
 */
const Questions = pool.query(`CREATE TABLE IF NOT EXISTS questions(
   id serial PRIMARY KEY,
   createdBy integer NOT NULL REFERENCES users(id),
   meetupId  integer NOT NULL REFERENCES meetups(id) ON DELETE CASCADE,
   title VARCHAR(70),
   body TEXT NOT NULL,
   vote INTEGER,
   createdon date
    )`);

export default Questions;
