
import {hPool, pool} from '../../server/credentials'; 
import dotenv from 'dotenv';
import {Pool, Client} from 'pg';
dotenv.config();  
const pool = new Pool({
   process.env.DATABASE_TEST_REMOTE_URL,
});

pool.connect((err, client, done)=>{
if(err){console.log('error')}
else {console.log('db connected')}
})

export default pool;
