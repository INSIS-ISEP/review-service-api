import { Repository } from 'typeorm';
import { Rating } from '../model/Rating';

export class RatingRepository extends Repository<Rating> {
  async findBySku(sku: string): Promise<Rating> {
    return await this.createQueryBuilder('r')
      .where('r.sku = :sku', { sku })
      .getOne()
      .then((rating) => {
        if (!rating) {
          throw new Error('Produto não encontrado');
        }
        return rating;
      });
  }
  async findByRate(rate: number): Promise<Rating> {
    return await this.createQueryBuilder('r')
      .where('r.rate = :rate', { rate })
      .getOne()
      .then((rating) => {
        if (!rating) {
          throw new Error('Produto não encontrado');
        }
        return rating;
      });
  }
}
