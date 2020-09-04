/* eslint-disable no-console */
import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { redisClient } from '../server';

dotenv.config();
export const authController = express.Router();

authController.post('/login', (req: Request, res: Response, next: NextFunction) => {
  const accessToken: string = generateAccessToken(req.body);
  const refreshToken: string = jwt.sign(req.body, process.env.REFRESH_TOKEN_SECRET as string);
  // refreshTokenDB.push(refreshToken);
  redisClient.sadd('refreshTokenDB', refreshToken, (err: any, data: any) => {
    if (err) {
      next(err);
    } else {
      console.log('Data: ', data);
      res.json({ accessToken, refreshToken });
    }
  });
});

authController.post('/refresh', (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.body.token;
  if (refreshToken === null) {
    res.sendStatus(401);
  } else {
    redisClient.sismember('refreshTokenDB', refreshToken, (err: any, data: any) => {
      if (err) {
        next(err);
      } else {
        console.log('Data: ', data);
        // res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: any, user: any) => {
          if (err) {
            res.sendStatus(403);
          } else {
            const { name, email } = user;
            const accessToken: string = generateAccessToken({ name, email });
            res.json({ accessToken });
          }
        });
      }
    });
  }
});

authController.delete('/logout', (req: Request, res: Response, next: NextFunction) => {
  redisClient.srem('refreshTokenDB', req.body.token, (err: any, data: any) => {
    if (err) {
      next(err);
    } else {
      console.log('Data: ', data);
      res.sendStatus(204);
    }
  });
});

function generateAccessToken (payload: any): string {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '10s' });
}
