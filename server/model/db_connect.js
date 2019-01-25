import dotenv from 'dotenv';
import {Pool, Client} from 'pg';

const DATABASE_LOCAL2 = {
   user: 'postgres',
   host: '127.0.0.1',
   database: 'questioner',
   password: 'a1b2c3d4e5',
   port: '5432'
}

dotenv.config();  
// const pool = new Pool({
//    connectionString: process.env.DATABASE_LOCAL2
// });

const pool = new Pool(DATABASE_LOCAL2);


pool.connect((err, client, done)=>{
if(err){console.log('error')}
else {console.log('db connected')}
})

export default pool;
