import pool from './db_connect';
/**
 * Create Question Table
 */
const Questions =
   pool.query(`CREATE TABLE IF NOT EXISTS questions(
   id serial PRIMARY KEY,
   createdBy VARCHAR(40) NOT NULL,
   meetupId  VARCHAR(40) NOT NULL,
   title VARCHAR(70),
   body TEXT NOT NULL,
   vote VARCHAR(60)
    )`)
    .then(res=>{

    })
   .catch(err=>{
      console.log(err);
      // pool.end();
   });

export default Questions;
