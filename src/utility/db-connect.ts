import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { errorHandler } from './errorHandler';
import { ERROR_MESSAGE } from './message';

dotenv.config();
mongoose.Promise = global.Promise;

export function connectToDB (_req: Request, _res: Response, next: NextFunction) {
  mongoose.connect(process.env.MONGO_DB_LOCAL_URI as string, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(_ => next())
    .catch((error: any) => {
      if (error) {
        const error = errorHandler(ERROR_MESSAGE.CONNECTION_FAILED);
        next(error);
      }
    });
}
