import { Module } from '@nestjs/common';
import { MyboardsController } from './myboards.controller';
import { MyboardsService } from './myboards.service';

@Module({
  controllers: [MyboardsController],
  providers: [MyboardsService]
})
export class MyboardsModule {}
