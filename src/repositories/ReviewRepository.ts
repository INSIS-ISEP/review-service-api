import { Repository } from 'typeorm';
import { Product } from '../model/Product';
import { Review } from '../model/Review';
import { User } from '../model/User';

export class ReviewRepository extends Repository<Review> {
  async findByProductId(product: Product): Promise<Review[]> {
    return await this.createQueryBuilder('r')
      .where('r.product = :product', { product })
      .orderBy('r.publishingDate', 'DESC')
      .getMany();
  }

  async findPendingReviews(): Promise<Review[]> {
    return await this.createQueryBuilder('r')
      .where('r.approvalStatus = :status', { status: 'pending' })
      .getMany();
  }

  async findActiveReviews(): Promise<Review[]> {
    return await this.createQueryBuilder('r')
      .where('r.approvalStatus = :status', { status: 'active' })
      .getMany();
  }

  async findByProductIdStatus(
    product: Product,
    status: string,
  ): Promise<Review[]> {
    return await this.createQueryBuilder('r')
      .where('r.product = :product', { product })
      .andWhere('r.approvalStatus = :status', { status })
      .orderBy('r.publishingDate', 'DESC')
      .getMany();
  }

  async findByUserId(user: User): Promise<Review[]> {
    return await this.createQueryBuilder('r')
      .where('r.user = :user', { user })
      .orderBy('r.publishingDate', 'DESC')
      .getMany();
  }
}
