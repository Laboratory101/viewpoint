import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { errorHandler } from '../utility/errorHandler';
import { MESSAGE } from '../utility/message';

import { Poll, PollModel } from '../model/poll';

dotenv.config();
mongoose.Promise = global.Promise;

export class PollCollection {
  constructor () {
    mongoose.connect(process.env.MONGO_DB_URI as string, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
      .catch((error: any) => {
        if (error) {
          throw errorHandler(MESSAGE.CONNECTION_FAILED);
        }
      });
  }

  public async savePoll (pollData: Poll): Promise<any> {
    return PollModel.insertMany([pollData]);
  }

  public async fetchAllPolls ():Promise<Poll[]> {
    return PollModel.find({});
  }

  public async fetchPollByRef (author:string):Promise<Poll[]> {
    return PollModel.find({ author });
  }
}
