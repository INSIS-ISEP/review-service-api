import { Repository } from 'typeorm';
import { Product } from '../model/Product';

export class ProductRepository extends Repository<Product> {
  async findBySku(sku: string): Promise<Product> {
    return await this.createQueryBuilder('p')
      .where('p.sku = :sku', { sku })
      .getOne()
      .then((product) => {
        if (!product) {
          throw new Error('Produto não encontrado');
        }
        return product;
      });
  }
}
