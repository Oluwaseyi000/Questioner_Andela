
import {hPool, pool} from '../../server/credentials'; 

pool.connect((err, client, done)=>{
if(err){console.log('error')}
else {console.log('db connected')}
})

export default pool;
