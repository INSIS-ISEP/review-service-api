import {
  Entity,
  PrimaryGeneratedColumn,
  VersionColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Product } from './Product';
import { Rating } from './Rating';
import { User } from './User';
import { Vote } from './Vote';

interface IReview {
  version?: number;
  approvalStatus?: string;
  reviewText: string;
  upVote?: Vote[];
  downVote?: Vote[];
  report?: string;
  publishingDate: Date;
  funFact: string;
  product: Product;
  user: User;
  rating?: Rating;
}

@Entity()
export class Review implements IReview {
  @PrimaryGeneratedColumn()
  idReview: number;

  @VersionColumn()
  version: number | undefined;

  @Column({ nullable: false })
  approvalStatus: string;

  @Column({ nullable: false })
  reviewText: string;

  @OneToMany(() => Vote, (vote) => vote.vote, { nullable: true })
  upVote: Vote[];

  @OneToMany(() => Vote, (vote) => vote.vote, { nullable: true })
  downVote: Vote[];

  @Column({ nullable: true })
  report: string;

  @Column({ nullable: false })
  publishingDate: Date;

  @Column({ nullable: false })
  funFact: string;

  @ManyToOne(() => Product, { nullable: false })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Rating, { cascade: true, nullable: true })
  rating: Rating;

  constructor(review: IReview) {
    this.version = review.version;
    this.setApprovalStatus(review.approvalStatus || 'pending');
    this.setReviewText(review.reviewText);
    this.setPublishingDate(review.publishingDate);
    this.setFunFact(review.funFact);
    this.setUpVote(review.upVote || []);
    this.setDownVote(review.downVote || []);
    this.setReport(review.report || '');
    this.setProduct(review.product);
    this.setUser(review.user);
    this.setRating(review.rating || new Rating(0.0));
  }
  public getIdReview(): number {
    return this.idReview;
  }

  public getApprovalStatus(): string {
    return this.approvalStatus;
  }

  public setApprovalStatus(approvalStatus: string): boolean {
    if (
      approvalStatus === 'pending' ||
      approvalStatus === 'approved' ||
      approvalStatus === 'rejected'
    ) {
      this.approvalStatus = approvalStatus;
      return true;
    }
    return false;
  }

  public getReviewText(): string {
    return this.reviewText;
  }

  public setReviewText(reviewText: string): void {
    if (reviewText == null || reviewText.trim() === '') {
      throw new Error('Review Text is a mandatory attribute of Review.');
    }
    if (reviewText.length > 2048) {
      throw new Error('Review Text must not be greater than 2048 characters.');
    }

    this.reviewText = reviewText;
  }

  public setReport(report: string): void {
    if (report.length > 2048) {
      throw new Error('Report must not be greater than 2048 characters.');
    }
    this.report = report;
  }

  public getPublishingDate(): Date {
    return this.publishingDate;
  }

  public setPublishingDate(publishingDate: Date): void {
    this.publishingDate = publishingDate;
  }

  public getVersion(): number | undefined {
    return this.version;
  }

  public getFunFact(): string {
    return this.funFact;
  }

  public setFunFact(funFact: string): void {
    this.funFact = funFact;
  }

  public setProduct(product: Product): void {
    this.product = product;
  }

  public getProduct(): Product {
    return this.product;
  }

  public getUser(): User {
    return this.user;
  }

  public setUser(user: User): void {
    this.user = user;
  }

  public getRating(): Rating {
    if (this.rating == null) {
      return new Rating(0.0);
    }
    return this.rating;
  }

  public setRating(rating: Rating): void {
    this.rating = rating;
  }

  public getUpVote(): Vote[] {
    return this.upVote;
  }

  public setUpVote(upVote: Vote[]): void {
    this.upVote = upVote;
  }

  public getDownVote(): Vote[] {
    return this.downVote;
  }

  public setDownVote(downVote: Vote[]): void {
    this.downVote = downVote;
  }

  addUpVote(upVote: Vote): boolean {
    if (this.approvalStatus !== 'approved') {
      return false;
    }

    if (!this.upVote.includes(upVote)) {
      this.upVote.push(upVote);
      return true;
    }

    return false;
  }

  addDownVote(downVote: Vote): boolean {
    if (this.approvalStatus !== 'approved') {
      return false;
    }

    if (!this.downVote.includes(downVote)) {
      this.downVote.push(downVote);
      return true;
    }

    return false;
  }
}
