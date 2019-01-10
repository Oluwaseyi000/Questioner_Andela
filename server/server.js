import express from 'express';
import router from './routes';
import bodyParser from 'body-parser'


const app = express();


app.use(express.json());   
app.use(bodyParser.json());                     
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());   
app.use(bodyParser.json({ type: 'application/json'}));                   
//app.use(express.urlencoded({extended: true}));


app.use('/api/v1', router);

let port = process.env.PORT || 5000;
const server = app.listen(port, ()=> console.log('server running'));

export default server;