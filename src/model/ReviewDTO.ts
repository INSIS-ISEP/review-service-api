interface IReviewDTO {
  idReview: number;
  reviewText: string;
  publishingDate: Date;
  approvalStatus: string;
  funFact: string;
  rating: number;
  vote: number;
}
export class ReviewDTO implements IReviewDTO {
  private _idReview: number;
  private _reviewText: string;
  private _vote: number;
  private _publishingDate: Date;
  private _approvalStatus: string;
  private _funFact: string;
  private _rating: number;

  constructor(
    idReview: number,
    reviewText: string,
    publishingDate: Date,
    approvalStatus: string,
    funFact: string,
    rating: number,
    vote: number,
  ) {
    this.idReview = idReview;
    this.reviewText = reviewText;
    this.publishingDate = publishingDate;
    this.approvalStatus = approvalStatus;
    this.funFact = funFact;
    this.rating = rating;
    this.vote = vote;
  }
  public get reviewText(): string {
    return this._reviewText;
  }
  public set reviewText(value: string) {
    this._reviewText = value;
  }
  public get publishingDate(): Date {
    return this._publishingDate;
  }
  public set publishingDate(value: Date) {
    this._publishingDate = value;
  }
  public get approvalStatus(): string {
    return this._approvalStatus;
  }
  public set approvalStatus(value: string) {
    this._approvalStatus = value;
  }
  public get funFact(): string {
    return this._funFact;
  }
  public set funFact(value: string) {
    this._funFact = value;
  }
  public get rating(): number {
    return this._rating;
  }
  public set rating(value: number) {
    this._rating = value;
  }
  public get vote(): number {
    return this._vote;
  }
  public set vote(value: number) {
    this._vote = value;
  }
  public get idReview(): number {
    return this._idReview;
  }
  public set idReview(value: number) {
    this._idReview = value;
  }
}
