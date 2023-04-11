import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../model/User';

export interface AuthenticatedRequest extends Request {
  user: User;
}

export class UserService {
  private userRepository: UserRepository;
  private secret = '';

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async findById(userId: number): Promise<User> {
    return await this.userRepository.findById(userId);
  }

  async getUserFromToken(req: Request): Promise<User> {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new Error('Token não fornecido');
    }

    try {
      const decoded = jwt.verify(token, this.secret) as any;

      const user = await this.userRepository.findById(decoded.userId);

      return user;
    } catch (error) {
      throw new Error('Token inválido');
    }
  }
}
