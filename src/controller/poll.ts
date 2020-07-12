import express, { Request, Response, NextFunction } from 'express';
import { PollCollection } from '../service/poll.collection';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../utility/message';
import { generatePin } from '../utility/util-tools';

export const pollController = express.Router();
const poll: PollCollection = new PollCollection();

pollController.post('/save-poll', (req: Request, res: Response, next: NextFunction) => {
  if (req.body.privacyType === 1) {
    req.body.pin = generatePin();
  }
  poll.savePoll(req.body).then(_response => {
    res.status(SUCCESS_MESSAGE.SAVE_POLL_SUCCESS.status as number).send({ message: SUCCESS_MESSAGE.SAVE_POLL_SUCCESS.message });
  }).catch((err: any) => {
    next(err);
  });
});

pollController.get('/load-poll/:host', (req: Request, res: Response, next: NextFunction) => {
  poll.fetchPollByRef({ host: req.params.host }).then(pollList => {
    res.status(200).send(pollList);
  }).catch(err => {
    err.message = ERROR_MESSAGE.FETCH_POLL_FAILED.message;
    next(err);
  });
});

pollController.get('/fetch-poll/:id', (req: Request, res: Response, next: NextFunction) => {
  poll.fetchPollByRef({ _id: req.params.id }).then(pollList => {
    res.status(200).send(pollList);
  }).catch(err => {
    err.message = ERROR_MESSAGE.FETCH_POLL_FAILED.message;
    next(err);
  });
});
