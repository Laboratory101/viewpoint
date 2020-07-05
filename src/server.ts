import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { requestLogger, errorLogger } from './utility/logger';
import { pollController } from './controller/poll';
import { participantController } from './controller/participant';
import { connectToDB } from './utility/db-connect';

// initialize configuration
dotenv.config();

const app: express.Application = express();
const port = process.env.SERVER_PORT;

app.use(cors());
app.use(express.json());
app.use(connectToDB);
app.use('/favicon.ico', (_req: Request, _res: Response) => { });
app.use(requestLogger);
app.use('/poll', pollController);
app.use('/participant', participantController);
app.all('*', (_req: Request, res: Response) => {
  res.send('Invalid route');
});
app.use(errorLogger);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started at http://localhost:${port}`);
});
