import pool from './db_connect';

/**
 * Create User Tables
 */


 const Users =  pool.query(`CREATE TABLE IF NOT EXISTS users(
   id serial PRIMARY KEY,
   firstname VARCHAR(40) NOT NULL, 
   lastName VARCHAR(40) NOT NULL,
   email VARCHAR(50) UNIQUE NOT NULL ,
   phoneNumber VARCHAR(40),
   othername VARCHAR(40),
   registered text ,
   isAdmin Boolean ,
   password TEXT
 )`)
    .then( () => {
      // pool.end();
   })
   .catch(err=>{
      console.log(err);
     pool.end();
   });

export default Users;
