/* eslint-disable no-console */
import express, { Request, Response, NextFunction } from 'express';
import { PollCollection } from '../service/poll.collection';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../utility/message';
import { addDays } from '../utility/util-tools';
import { errorHandler } from '../utility/errorHandler';
import { websocket } from '../server';

export const participantController = express.Router();
const poll: PollCollection = new PollCollection();

participantController.post('/poll', (req: Request, res: Response, next: NextFunction) => {
  const search = { _id: req.body.pollId };
  const filterBy = { participantCount: 0, author: 0, updatedAt: 0, __v: 0 };
  poll.fetchPollByRef(search, filterBy).then((response: any) => {
    const data = response[0];
    const today = new Date().getTime();
    if (today > addDays(data.createdAt, data.duration)) {
      const err = errorHandler(ERROR_MESSAGE.UNAVAILABLE_RESOURCE);
      next(err);
    } else if (data.privacyType === 1 && req.body.pin !== data.pin) {
      const err = errorHandler(ERROR_MESSAGE.INCORRECT_PIN);
      next(err);
    } else {
      res.status(200).send(data);
    }
  }).catch(_ => {
    const err = errorHandler(ERROR_MESSAGE.UNAVAILABLE_RESOURCE);
    next(err);
  });
});

participantController.post('/vote', async (req: Request, res: Response, next: NextFunction) => {
  let errorObj: any;
  if (req.body.pollId && req.body.candidateId) {
    const search = { _id: req.body.pollId };
    const filterBy = { _id: 0, participantCount: 0, author: 0, updatedAt: 0 };
    try {
      const selectedPoll: Array<any> = await poll.fetchPollByRef(search, filterBy);
      const today: number = new Date().getTime();
      if (today > addDays(selectedPoll[0].createdAt, selectedPoll[0].duration)) {
        const err = errorHandler(ERROR_MESSAGE.UNAVAILABLE_RESOURCE);
        next(err);
      } else {
        poll.voteCandidate(req.body.pollId, req.body.candidateId).then((updatedData: any) => {
          if (updatedData && updatedData.resultDisplayType === 1) {
            websocket.in(updatedData._id).emit('send-message', updatedData.candidates);
          }
          res.status(SUCCESS_MESSAGE.VOTING_SUCCESS.status as number).send({ message: SUCCESS_MESSAGE.VOTING_SUCCESS.message });
        }).catch(err => {
          errorObj = errorHandler(ERROR_MESSAGE.ERROR_VOTING, err.stack);
          next(errorObj);
        });
      }
    } catch (err) {
      err.message = ERROR_MESSAGE.FETCH_POLL_FAILED.message;
      next(err);
    }
  } else {
    errorObj = errorHandler(ERROR_MESSAGE.MISSING_DATA);
    next(errorObj);
  }
});
