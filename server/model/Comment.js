import pool from './db_connect';

/**
 * Create Meetup Table
 */
const Comments = pool.query(`CREATE TABLE IF NOT EXISTS comments(
   id serial PRIMARY KEY,
   userid  INTEGER NOT NULL REFERENCES users(id),
   questionid INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
   body TEXT,
   createdOn DATE, 
   updatedOn DATE
    )`);

export default Comments;
