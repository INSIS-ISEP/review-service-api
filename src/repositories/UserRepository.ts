import { Repository } from 'typeorm';
import { User } from '../model/User';

export class UserRepository extends Repository<User> {
  async findById(userId: number): Promise<User> {
    return await this.createQueryBuilder('u')
      .where('u.userId = :userId', { userId })
      .getOne()
      .then((user) => {
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      });
  }
}
