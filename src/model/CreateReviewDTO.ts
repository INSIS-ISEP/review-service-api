export class CreateReviewDTO {
  private _reviewText: string;
  private _userID: number;
  private _rating: number;

  constructor(reviewText: string, rating?: number, userID?: number) {
    this._reviewText = reviewText;
    this._rating = rating || 0;
    this._userID = userID || 0;
  }

  get rating(): number {
    return this._rating;
  }

  set rating(rating: number) {
    this._rating = rating;
  }

  get reviewText(): string {
    return this._reviewText;
  }

  set reviewText(reviewText: string) {
    this._reviewText = reviewText;
  }

  get userID(): number {
    return this._userID;
  }

  set userID(userID: number) {
    this._userID = userID;
  }
}
