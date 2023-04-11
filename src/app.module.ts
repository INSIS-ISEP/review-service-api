import { Module } from '@nestjs/common';
import { ReviewController } from './controllers/ReviewController';
import { ReviewServiceImpl } from './services/ReviewServiceImpl';
import { DatabaseService } from './services/database.service';

@Module({
  imports: [],
  controllers: [ReviewController],
  providers: [ReviewServiceImpl, DatabaseService],
})
export class AppModule {}
