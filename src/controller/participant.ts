/* eslint-disable no-console */
import express, { Request, Response, NextFunction } from 'express';
import { PollCollection } from '../service/poll.collection';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../utility/message';
import { addDays } from '../utility/util-tools';
import { errorHandler } from '../utility/errorHandler';
import { SocketConnection } from '../utility/socket';

export const participantController = express.Router();
const poll: PollCollection = new PollCollection();
const io = new SocketConnection();

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

participantController.post('/vote', (req: Request, res: Response, next: NextFunction) => {
  let errorObj: any;
  if (req.body.pollId && req.body.candidateId) {
    poll.voteCandidate(req.body.pollId, req.body.candidateId).then((updatedData: any) => {
      if (updatedData && updatedData.resultDisplayType === 1) {
        io.joinRoom();
        io.broadcastMessage(updatedData._id, updatedData.candidates);
      }
      res.status(SUCCESS_MESSAGE.VOTING_SUCCESS.status as number).send({ message: SUCCESS_MESSAGE.VOTING_SUCCESS.message });
    }).catch(err => {
      errorObj = errorHandler(ERROR_MESSAGE.ERROR_VOTING, err.stack);
      next(errorObj);
    });
  } else {
    errorObj = errorHandler(ERROR_MESSAGE.MISSING_DATA);
    next(errorObj);
  }
});
