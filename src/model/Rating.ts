interface IRating {
  rate: number;
}

export class Rating {
  rate: number;

  constructor(rate: number) {
    this.rate = rate;
  }
}
