/* eslint-disable no-console */
import express, { Request, Response, NextFunction } from 'express';
import { PollCollection } from '../service/poll.collection';
import { ERROR_MESSAGE } from '../utility/message';
import { addDays } from '../utility/util-tools';
import { errorHandler } from '../utility/errorHandler';

export const participantController = express.Router();
const poll: PollCollection = new PollCollection();

participantController.post('/poll', (req: Request, res: Response, next: NextFunction) => {
  const search = { _id: req.body.id };
  const filterBy = { _id: 0, participantCount: 0, author: 0, updatedAt: 0 };
  poll.fetchPollByRef(search, filterBy).then((response: any) => {
    const data = response[0];
    const today = new Date().getTime();
    if (today > addDays(data.createdAt, data.duration)) {
      const err = errorHandler(ERROR_MESSAGE.UNAVAILABLE_RESOURCE);
      next(err);
    } else if (req.body.privacyType === 1 && req.body.pin !== data.pin) {
      const err = errorHandler(ERROR_MESSAGE.INCORRECT_PIN);
      next(err);
    } else {
      res.status(200).send(data);
    }
  }).catch(err => {
    err.message = ERROR_MESSAGE.FETCH_POLL_FAILED.message;
    next(err);
  });
});
