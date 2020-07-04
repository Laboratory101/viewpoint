/* eslint-disable no-console */
import fs from 'fs';
import { Response, Request, NextFunction } from 'express';
import path from 'path';

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
    const errorMessage: string = '' + new Date() + '-' + err.stack + '\n';
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
