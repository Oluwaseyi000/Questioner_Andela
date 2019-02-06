import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  // allow preflight
  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

app.use('/api/v1', router);

const port = process.env.PORT || 5000;
if (!module.parent) {
  // eslint-disable-next-line no-console
  app.listen(port, () => console.log('server running'));
}

export default app;
