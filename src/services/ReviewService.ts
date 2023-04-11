import { CreateReviewDTO } from '../model/CreateReviewDTO';
import { Product } from '../model/Product';
import { Review } from '../model/Review';
import { Request } from 'express';
import { ReviewDTO } from '../model/ReviewDTO';

export interface ReviewService {
  getAll(): Iterable<Review>;

  getReviewsOfProduct(sku: string, status: string): Promise<ReviewDTO[]>;

  create(createReviewDTO: CreateReviewDTO, sku: string): Promise<ReviewDTO>;

  getWeightedAverage(product: Product): Promise<number>;

  DeleteReview(reviewId: number): Promise<boolean>;

  findPendingReview(): Promise<ReviewDTO[]>;

  moderateReview(reviewID: number, approved: string): Promise<ReviewDTO>;

  findReviewsByUser(userID: number): Promise<ReviewDTO[]>;
}
