import {Pool} from 'pg';
import { connect } from 'net';

const pool = new Pool({
   user: 'postgres',
   host: '127.0.0.1',
   database: 'questioner',
   password: 'a1b2c3d4e5',
   port: '5432'
});
pool.connect((err, client, done)=>{
if(err){console.log('error')}
else {console.log('db connected')}
})

export default pool;
