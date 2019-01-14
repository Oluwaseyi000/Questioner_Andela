import pool from './db_connect';

/**
 * Create User Tables
 */
const Users =
   pool.query(`CREATE TABLE IF NOT EXISTS users(
      id UUID PRIMARY KEY,
      firstname VARCHAR(40) NOT NULL, 
      lastName VARCHAR(40) NOT NULL,
      email VARCHAR(50) NOT NULL,
      phoneNumber VARCHAR(40),
      othername VARCHAR(40),
      registered TIMESTAMP ,
      isAdmin Boolean ,
      password VARCHAR(40) 
    )`)
    .then( () => {
      pool.end();
   })
   .catch(err=>{
      console.log(err);
     // pool.end();
   });

export default Users;
