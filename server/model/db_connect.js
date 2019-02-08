import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_REMOTE,
});

pool.connect((err) => {
  if (err) { console.log('error'); } else { console.log('db connected'); }
});

export default pool;
