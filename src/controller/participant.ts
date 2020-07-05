/* eslint-disable no-console */
import express, { Request, Response, NextFunction } from 'express';
import { PollCollection } from '../service/poll.collection';
import { ERROR_MESSAGE } from '../utility/message';
import { addDays } from '../utility/util-tools';
import { errorHandler } from '../utility/errorHandler';

export const participantController = express.Router();
const poll: PollCollection = new PollCollection();

participantController.get('/poll/:id', (req: Request, res: Response, next: NextFunction) => {
  const search = { _id: req.params.id };
  const filterBy = { title: 1, description: 1, candidates: 1, createdAt: 1, duration: 1, _id: 0 };
  poll.fetchPollByRef(search, filterBy).then((response: any) => {
    const data = response[0];
    const today = new Date().getTime();
    if (today <= addDays(data.createdAt, data.duration)) {
      res.status(200).send(data);
    } else {
      const err = errorHandler(ERROR_MESSAGE.UNAVAILABLE_RESOURCE);
      next(err);
    }
  }).catch(err => {
    err.message = ERROR_MESSAGE.FETCH_POLL_FAILED.message;
    next(err);
  });
});
