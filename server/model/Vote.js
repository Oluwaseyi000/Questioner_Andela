import pool from './db_connect';

/**
 * Create Votes Table
 */
const Votes = 
   pool.query(`CREATE TABLE IF NOT EXISTS Votes(
   id UUID PRIMARY KEY,
   questionId VARCHAR(40) NOT NULL,
   voteType VARCHAR(10) NOT NULL,
   createdOn TIMESTAMP
   )`, (err, res) => {
      console.log(err, res);
     pool.end();
   });
//}

export default Votes;
