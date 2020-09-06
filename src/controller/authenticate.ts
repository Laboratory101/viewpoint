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
  redisClient.setex(req.body.email, 86400, refreshToken, (err: any, data: any) => {
    if (err) {
      next(err);
    } else if (data) {
      res.json({ accessToken, refreshToken });
    } else {
      const err = new Error('Error in saving data to Redis');
      next(err);
    }
  });
});

authController.post('/refresh', (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.body.token;
  if (refreshToken === null) {
    res.sendStatus(401);
  } else {
    redisClient.get(req.body.email, (err: any, data: any) => {
      if (err) {
        next(err);
      } else {
        if (data) {
          jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: any, user: any) => {
            if (err) {
              res.sendStatus(403);
            } else {
              const { name, email } = user;
              const accessToken: string = generateAccessToken({ name, email });
              res.json({ accessToken });
            }
          });
        } else {
          res.sendStatus(403);
        }
      }
    });
  }
});

authController.delete('/logout', (req: Request, res: Response, next: NextFunction) => {
  redisClient.del(req.body.email, (err: any, data: any) => {
    if (err) {
      next(err);
    } else if (data) {
      res.sendStatus(204);
    } else {
      const err = new Error('Error in deleting data from Reddis');
      next(err);
    }
  });
});

function generateAccessToken (payload: any): string {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '30m' });
}
