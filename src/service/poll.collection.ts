/* eslint-disable no-console */
import { Poll, PollModel } from '../model/poll';

export class PollCollection {
  public async savePoll (pollData: Poll): Promise<any> {
    return PollModel.insertMany([pollData]);
  }

  public async fetchAllPolls (): Promise<Poll[]> {
    return PollModel.find({});
  }

  public async fetchPollByRef (parameter: any, projection?: any): Promise<Poll[]> {
    return PollModel.find(parameter, projection);
  }

  public async voteCandidate (pollId: string, candidateId: any): Promise<Poll | null> {
    const searchQuery = { _id: pollId, 'candidates._id': candidateId };
    const update = { $inc: { 'candidates.$.count': 1 } };
    return PollModel.findOneAndUpdate(searchQuery, update, { new: true });
  }

  public async fetchPollResult (pollId: string): Promise<Poll | null> {
    const projection = { title: 1, resultDisplayType: 1, description: 1, candidates: 1, _id: 0 };
    return PollModel.findById(pollId, projection);
  }
}
