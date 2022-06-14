import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { Task } from './task.entity';

@Module({ 
  imports: [
    TypeOrmModule.forFeature([Task]),
  ],
  controllers: [AppController],
  exports: [AppService],
  providers: [AppService],
})
export class TasksModule {}
