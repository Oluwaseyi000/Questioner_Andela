import dotenv from 'dotenv';
import {Pool, Client} from 'pg';

dotenv.config();  
const pool = new Pool({
   connectionString: process.env.DATABASE_REMOTE,
});

pool.connect((err, client, done)=>{
if(err){console.log('error')}
else {console.log('db connected')}
})

export default pool;
