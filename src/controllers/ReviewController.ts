import 'reflect-metadata';
import { Get, Param, Post, Body } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

export class ReviewController {
  @OpenAPI({
    summary: 'finds a product through its sku and shows its review by status',
  })
  @Get('/products/{sku}/reviews/{status}')
  findById(@Param('status') status: string) {
    return status;
  }

  @OpenAPI({ summary: 'gets review by user' })
  @Get('/reviews/{userID}')
  findByUser(@Param('userID') userID: string) {
    return userID;
  }

  @OpenAPI({ summary: 'creates review' })
  @Post('/products/{sku}/reviews')
  createReview(@Body() body: any, @Param('sku') sku: string) {
    return body;
  }

  @OpenAPI({ summary: 'deletes review' })
  @Post('/reviews/{reviewID}')
  deleteReview(@Param('reviewID') reviewID: string) {
    return reviewID;
  }

  @OpenAPI({ summary: 'gets pedding reviews' })
  @Post('/reviews/pending')
  getPendingReviews() {
    return 'pending';
  }

  @OpenAPI({ summary: 'Accept or reject review' })
  @Post('/reviews/acceptreject/{reviewID}')
  acceptRejectReview(
    @Param('reviewID') reviewID: string,
    @Body() approved: string,
  ) {
    return approved;
  }
}
