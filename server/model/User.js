import pool from './db_connect';

/**
 * Create User Tables
 */
const Users =
   pool.query(`CREATE TABLE IF NOT EXISTS Users(
   id UUID PRIMARY KEY,
   firstname VARCHAR(40) NOT NULL, 
   lastName VARCHAR(40) NOT NULL,
   email VARCHAR(50) NOT NULL,
   phoneNumber VARCHAR(40),
   othername VARCHAR(40),
   registered TIMESTAMP ,
   isAdmin Boolean ,
   password VARCHAR(70)
   )`, (err, res) => {
     
     pool.end();
   });

export default Users;