import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { AuthModule } from 'src/auth/auth.module';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { Task } from './task.entity';

@Module({ 
  imports: [
    TypeOrmModule.forFeature([Task]),
    AuthModule,
  ],
  controllers: [AppController],
  exports: [AppService],
  providers: [AppService],
})
export class TasksModule {}
