import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_REMOTE,
});

// const pool2 = new Pool({
//   user: 'postgres',
//   host: '127.0.0.1',
//   database: 'questioner',
//   password: 'a1b2c3d4e5',
//   port: '5432',
// });


pool.connect((err) => {
  if (err) { console.log('error'); } else { console.log('db connected'); }
});

export default pool;
