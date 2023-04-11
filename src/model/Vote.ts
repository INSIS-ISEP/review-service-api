interface IVote {
  vote: string;
  userID: number;
}
export class Vote implements IVote {
  vote: string;
  userID: number;
  constructor(vote: string, userID: number) {
    this.vote = vote;
    this.userID = userID;
  }
}
