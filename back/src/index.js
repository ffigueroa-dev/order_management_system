import express from 'express';
import cors from 'cors';

import './db/models/index.js';

import envs from './envs/index.js';
import { routerApi } from './controllers/index.js';
import {
  boomErrorHandler,
  errorHandler,
  logErrors,
} from './middlewares/errorHandler.js';

const app = express();
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
app.listen(envs.port, () => {
  console.info(`app running at port ${envs.port}`);
});
