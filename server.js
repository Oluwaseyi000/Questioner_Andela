const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {Pool} = require('pg');
const port = process.env.PORT||5000;

const db_url = "postgres://postgres:a1b2c3d4e5@127.0.0.1:49286/5432/questioner/"
const db_url2= 'postgres://oluwaseyi:a1b2c3d4e5@127.0.0.1:5432/reflection_db';
const db = {
   host: '127.0.0.1',
   port:5432,
   database: 'reflection_db',
   user: 'oluwaseyi',
   password: 'a1b2c3d4e5'
}


const pool = new Pool({
   db
 });
 pool.on('connect', () => {
   console.log('connected to the db');
 });

 pool.query("SELECT NOW()", (err, res)=>{console.log(err, res);
pool.end();});
const router = require('./routes');

app.use(bodyParser.json());                     
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());   
app.use(bodyParser.json({ type: 'application/json'})); 




app.use('/api/v1', router);


if(!module.parent){app.listen(port)}

module.exports = app;
