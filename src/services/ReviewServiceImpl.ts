import axios from 'axios';
import { CreateReviewDTO } from '../model/CreateReviewDTO';
import { Product } from '../model/Product';
import { Review } from '../model/Review';
import { ReviewDTO } from '../model/ReviewDTO';
import { ReviewRepository } from '../repositories/ReviewRepository';
import { ReviewService } from './ReviewService';
import { UserService } from './UserService';
import { ProductRepository } from '../repositories/ProductRepository';
import { ReviewMapper } from '../model/ReviewMapper';
import { RatingRepository } from '../repositories/RatingRepository';

export class ReviewServiceImpl implements ReviewService {
  private repository: ReviewRepository;
  private pRepository: ProductRepository;
  private ratingRepository: RatingRepository;
  private uService: UserService;
  constructor(repository: ReviewRepository) {
    this.repository = repository;
  }

  public getAll(): Iterable<Review> {
    return this.repository[Symbol.iterator]();
  }

  async getReviewsOfProduct(sku: string, status: string): Promise<ReviewDTO[]> {
    const product = this.pRepository.findBySku(sku);
    if (product == null) {
      throw new Error('Produto não encontrado');
    }
    const reviews = this.repository.findByProductIdStatus(
      await product,
      status,
    );
    if (reviews == null) {
      throw new Error('Produto não encontrado');
    }
    return ReviewMapper.toDtoList(await reviews);
  }
  async create(
    createReviewDTO: CreateReviewDTO,
    sku: string,
  ): Promise<ReviewDTO> {
    const product = this.pRepository.findBySku(sku);
    const user = this.uService.findById(createReviewDTO.userID);
    const rating = this.ratingRepository.findByRate(createReviewDTO.rating);
    const date = new Date();
    const funfact = axios
      .get(`http://numbersapi.com/${date.getMonth()}/${date.getDate()}/date`)
      .then((response) => response.data)
      .catch((error) => console.log(error));

    const review: Review = new Review({
      reviewText: createReviewDTO.reviewText,
      publishingDate: date,
      product: await product,
      user: await user,
      rating: await rating,
      funFact: await funfact,
    });

    const reviewC = this.repository.save(review).then((review) => {
      if (!review) {
        throw new Error('Erro ao salvar review');
      }
      return review;
    });

    return ReviewMapper.toDTO(await reviewC);
  }
  getWeightedAverage(product: Product): Promise<number> {
    throw new Error('Method not implemented.');
  }
  DeleteReview(reviewId: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  findPendingReview(): Promise<ReviewDTO[]> {
    throw new Error('Method not implemented.');
  }
  moderateReview(reviewID: number, approved: string): Promise<ReviewDTO> {
    throw new Error('Method not implemented.');
  }
  findReviewsByUser(userID: number): Promise<ReviewDTO[]> {
    throw new Error('Method not implemented.');
  }
}
