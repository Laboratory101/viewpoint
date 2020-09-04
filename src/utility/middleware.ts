/* eslint-disable no-console */
import fs from 'fs';
import { Response, Request, NextFunction } from 'express';
import path from 'path';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { errorHandler } from './errorHandler';
import { ERROR_MESSAGE } from './message';

dotenv.config();

export function requestLogger (req: Request, _res: Response, next: NextFunction) {
  const logMessage: string = '' + new Date() + '-' + req.method + ' ' + req.url + '\n';
  const filePath: string = path.join(__dirname, '../..', 'logs', 'request-logs', 'request.txt');
  fs.appendFile(filePath, logMessage, err => {
    if (err) return next(err);
  });
  next();
}

export function errorLogger (err: any, _req: Request, res: Response, next: NextFunction) {
  if (err) {
    const errorMessage: string = '\n' + new Date() + '-' + err.stack || err.message + '\n';
    const filePath: string = path.join(__dirname, '../..', 'logs', 'error-logs', 'error.txt');
    fs.appendFile(filePath, errorMessage, err => {
      if (err) {
        console.log('Failed in logging error');
      }
    });
    if (err.status) {
      res.status(err.status);
    } else {
      res.status(500);
    }
    res.json({ message: err.message });
  }
  next();
}

export function authenticateToken (req: any, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  let errorObj: any;
  if (token === null) {
    errorObj = errorHandler(ERROR_MESSAGE.TOKEN_MSSING);
    next(errorObj);
  } else {
    jwt.verify(token as string, process.env.ACCESS_TOKEN_SECRET as string, (err, user) => {
      if (err) {
        errorObj = errorHandler(ERROR_MESSAGE.INVALID_TOKEN, err.stack);
        next(errorObj);
      }
      console.log('User: ', user);
      req.user = { ...user };
      next();
    });
  }
}
