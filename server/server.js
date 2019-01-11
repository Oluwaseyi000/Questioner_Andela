import express from 'express';
import router from './routes';
import bodyParser from 'body-parser'

const app = express();  
app.use(bodyParser.json());                
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ type: 'application/json'}));                   
app.use('/api/v1', router);

const port = process.env.PORT || 5000;
if(!module.parent) {
   const server = app.listen(port, ()=> console.log('server running'));
}

export default app;