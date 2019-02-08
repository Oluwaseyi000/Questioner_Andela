import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swagger from 'swagger-ui-express';
import { multerUploads } from './middleware/multer';

import router from './routes';

import quesDoc from './swagger.json';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(cors());

app.post('/upload', multerUploads, (req, res) => {
  console.log('req.body :', req.body);
});

app.use('/api/v1', router);
app.use('/api-docs', swagger.serve, swagger.setup(quesDoc));

const port = process.env.PORT || 5000;
if (!module.parent) {
  // eslint-disable-next-line no-console
  app.listen(port, () => console.log('server running'));
}


export default app;
