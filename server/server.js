import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';
import cors from 'cors';

const app = express();  
app.use(bodyParser.json());                
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ type: 'application/json'}));  
app.use(cors());
                 
app.use('/api/v1', router);

const port = process.env.PORT || 5000;
if (!module.parent) {
  // eslint-disable-next-line no-console
  app.listen(port, () => console.log(`server running`));
}

export default app;
