
import {hPool, pool} from '../../server/credentials'; 

// const hPool = new Pool({
//    user: 'uzivfnggjzgogw',
//    host: 'ec2-54-235-68-3.compute-1.amazonaws.com',
//    database: 'd21i2fjlvq70hi',
//    password: 'b4cc17d39f0fc59e49402ffabd71eff093860bfd358bfff68d83d644ef5ca62d',
//    port: '5432',
//    ssl: true
// });
// const pool = new Pool({
//    user: 'postgres',
//    host: 'localhost',
//    database: 'questioner',
//    password: 'a1b2c3d4e5',
//    port: '5432',
// });

pool.connect((err, client, done)=>{
if(err){console.log('error')}
else {console.log('db connected')}
})

export default pool;
