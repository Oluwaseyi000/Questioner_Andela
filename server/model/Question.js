import pool from './db_connect';
/**
 * Create Question Table
 */
const Questions =
   pool.query(`CREATE TABLE IF NOT EXISTS questions(
   id UUID PRIMARY KEY,
   createdBy VARCHAR(40) NOT NULL,
   meetupId  VARCHAR(40) NOT NULL,
   title VARCHAR(70),
   body TEXT NOT NULL,
   happeningOn DATE NOT NULL,
   tags TEXT,
   details TEXT,
   host VARCHAR(50),
   createdOn TIMESTAMP
    )`)
    .then(res=>{

    })
   .catch(err=>{
      console.log(err);
      // pool.end();
   });

export default Questions;
