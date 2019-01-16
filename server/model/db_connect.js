import dotenv from 'dotenv';
import {Pool, Client} from 'pg';
dotenv.config();  
// const pool = new Pool({
//    connectionString: process.env.DATABASE_LOCAL,
// });
const pool2 = new Pool({
   user: 'postgres',
   host: 'localhost',
   database: 'questioner',
   password: 'a1b2c3d4e5',
   port: '5432',
});

pool2.connect((err, client, done)=>{
if(err){console.log('error')}
else {console.log('db connected')}
})

export default pool2;
