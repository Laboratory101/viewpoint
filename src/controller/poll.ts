import express, { Request, Response, NextFunction } from 'express';
import { PollCollection } from '../service/poll.collection';

export const pollController = express.Router();
const poll: PollCollection = new PollCollection();

pollController.post('/savePoll', (req: Request, res: Response, next: NextFunction) => {
  poll.savePoll(req.body).then(_response => {
    res.status(200).send({ message: 'Insertion Successfull' });
  }).catch(err => {
    err.message = 'Insertion failed. Check with DB Admin';
    next(err);
  });
});
