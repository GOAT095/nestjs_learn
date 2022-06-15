import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { TaskRepository } from './tasks/task.repository';

@Module({
  imports: [TasksModule, 
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
  controllers: [TasksController],
  providers: [TasksService, TaskRepository],

})
export class AppModule {}
