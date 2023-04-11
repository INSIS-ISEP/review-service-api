import { Review } from './Review';
import { ReviewDTO } from './ReviewDTO';

export class ReviewMapper {
  public static toDTO(review: Review): ReviewDTO {
    return new ReviewDTO(
      review.idReview,
      review.reviewText,
      review.publishingDate,
      review.approvalStatus,
      review.funFact,
      review.rating.rate,
      review.upVote.length - review.downVote.length,
    );
  }
  public static toDtoList(reviews: Review[]): ReviewDTO[] {
    const reviewDTOs: ReviewDTO[] = [];
    reviews.forEach((review) => {
      reviewDTOs.push(ReviewMapper.toDTO(review));
    });
    return reviewDTOs;
  }
}
