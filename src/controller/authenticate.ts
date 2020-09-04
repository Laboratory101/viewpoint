/* eslint-disable no-console */
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export const authController = express.Router();

authController.post('/login', (req: Request, res: Response) => {
  const accessToken: string = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET as string);
  res.json({ accessToken });
});
