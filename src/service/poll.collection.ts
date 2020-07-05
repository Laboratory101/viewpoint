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

  public async voteCandidate (pollId: string, candidateId: any): Promise<any> {
    const searchQuery = { _id: pollId, 'candidate.id': candidateId };
    const update = { $inc: { 'candidate.count': 1 } };
    return PollModel.findByIdAndUpdate(searchQuery, update);
  }
}
