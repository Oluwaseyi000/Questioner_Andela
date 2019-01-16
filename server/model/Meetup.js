import pool from './db_connect';

/**
 * Create Meetup Table
 */
const Meetups =
   pool.query(`CREATE TABLE IF NOT EXISTS meetups(
   id UUID PRIMARY KEY,
   location  VARCHAR(70) NOT NULL,
   images TEXT,
   topic VARCHAR(120) NOT NULL,
   happeningOn DATE NOT NULL,
   tags TEXT,
   details TEXT,
   host VARCHAR(50),
   createdOn TIMESTAMP, 
   updatedOn DATE
    )`)
   .catch(err=>{
      console.log(err);
    
   });

export default Meetups;