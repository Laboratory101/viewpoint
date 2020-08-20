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
  poll.fetchPollByRef({ host: req.params.host }, { __v: 0, createdAt: 0, updatedAt: 0 }).then(pollList => {
    res.status(200).send(pollList);
  }).catch(err => {
    err.message = ERROR_MESSAGE.FETCH_POLL_FAILED.message;
    next(err);
  });
});

pollController.get('/fetch-poll/:id', (req: Request, res: Response, next: NextFunction) => {
  const projection = { __v: 0, updatedAt: 0 };
  poll.fetchPollByRef({ _id: req.params.id }, projection).then(pollList => {
    res.status(200).send(pollList[0]);
  }).catch(err => {
    err.message = ERROR_MESSAGE.FETCH_POLL_FAILED.message;
    next(err);
  });
});

pollController.put('/update-poll/:id', (req: Request, res: Response, next: NextFunction) => {
  if (req.body.privacyType === 1) {
    req.body.pin = generatePin();
  }
  poll.updatePoll(req.params.id, req.body).then(response => {
    if (response.nModified) {
      res.status(SUCCESS_MESSAGE.UPDATE_POLL_SUCCESS.status as number).send({ message: SUCCESS_MESSAGE.UPDATE_POLL_SUCCESS.message });
    } else {
      res.status(ERROR_MESSAGE.UPDATE_POLL_FAILED.status as number).send({ message: ERROR_MESSAGE.UPDATE_POLL_FAILED.message });
    }
  }).catch(err => {
    next(err);
  });
});

pollController.delete('/delete-poll/:id', (req: Request, res: Response, next: NextFunction) => {
  poll.deletePoll(req.params.id).then(response => {
    if (response.deletedCount) {
      res.status(SUCCESS_MESSAGE.DELETE_POLL_SUCCESS.status as number).send({ message: SUCCESS_MESSAGE.DELETE_POLL_SUCCESS.message });
    } else {
      res.status(ERROR_MESSAGE.DELETE_POLL_FAILED.status as number).send({ message: ERROR_MESSAGE.DELETE_POLL_FAILED.message });
    }
  }).catch(err => {
    next(err);
  });
});
