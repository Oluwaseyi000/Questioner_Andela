/* eslint-disable no-console */
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_REMOTE,
});


pool.connect((err) => {
  if (err) { console.log(`${err} ${process.env.NODE_ENV}`); } else { console.log('db connected'); }
});

export default pool;
