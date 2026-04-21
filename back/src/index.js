import express from 'express';

import envs from './envs/index.js';

import { routerApi } from './controllers/index.js';
import {
  boomErrorHandler,
  errorHandler,
  logErrors,
} from './middlewares/errorHandler.js';

const app = express();
app.use(express.json());

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
app.listen(envs.port, () => {
  console.info(`app running at port ${envs.port}`);
});
