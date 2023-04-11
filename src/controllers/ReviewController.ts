import 'reflect-metadata';
import { Get, Param, Post, Body, Controller } from '@nestjs/common';
import { OpenAPI } from 'routing-controllers-openapi';
import { DatabaseService } from 'src/services/database.service';
@Controller()
export class ReviewController {
  constructor(private readonly databaseService: DatabaseService) {}

  @OpenAPI({
    summary: 'finds a product through its sku and shows its review by status',
  })
  @Get('/products/:sku/reviews/:status')
  findById(@Param('status') status: string) {
    return status;
  }

  @OpenAPI({ summary: 'gets review by user' })
  @Get('/reviews/:sku')
  async findProductBySku(@Param('sku') sku: string) {
    const sql = `SELECT * FROM Product WHERE sku = $1`;
    const params = [sku];
    const res = await this.databaseService.query(sql, params);
    return res;
  }

  @OpenAPI({ summary: 'creates review' })
  @Post('/products/:sku/reviews')
  createReview(@Body() body: any, @Param('sku') sku: string) {
    return body;
  }

  @OpenAPI({ summary: 'deletes review' })
  @Post('/reviews/:reviewID')
  deleteReview(@Param('reviewID') reviewID: string) {
    return reviewID;
  }

  @OpenAPI({ summary: 'gets pedding reviews' })
  @Get('/reviews/pending')
  async getPendingReviews() {
    const sql = `SELECT * FROM review WHERE status = 'pending'`;
    const res = await this.databaseService.query(sql);
    return res;
  }

  @OpenAPI({ summary: 'Accept or reject review' })
  @Post('/reviews/acceptreject/:reviewID')
  acceptRejectReview(
    @Param('reviewID') reviewID: string,
    @Body() approved: string,
  ) {
    return approved;
  }
}
