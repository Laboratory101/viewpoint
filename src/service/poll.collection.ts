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
}
