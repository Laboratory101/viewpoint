/* eslint-disable no-console */
import express, { Request, Response } from 'express';
import cors from 'cors';
import { requestLogger, errorLogger, authenticateToken } from './utility/middleware';
import { pollController } from './controller/poll';
import { participantController } from './controller/participant';
import { connectToDB } from './utility/db-connect';
import { authController } from './controller/authenticate';

export class ViewPortServer {
  private _app: express.Application;

  constructor () {
    this._app = express();
    this._app.use(cors());
    this._app.use(express.json());
    this._app.use(connectToDB);
    this._app.use('/favicon.ico', (_req: Request, _res: Response) => { });
    this._app.use(requestLogger);
    this._app.use('/auth', authController);
    this._app.use('/poll', [authenticateToken, pollController]);
    this._app.use('/participate', participantController);
    this._app.all('*', (_req: Request, res: Response) => {
      res.send('Invalid route');
    });
    this._app.use(errorLogger);
  }

  get app (): express.Application {
    return this._app;
  }
}
