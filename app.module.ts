import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { TaskRepository } from './tasks/task.repository';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TasksModule, 
    TypeOrmModule.forRoot(typeOrmConfig), AuthModule,
  ],
  controllers: [TasksController],
  providers: [TasksService, TaskRepository],

})
export class AppModule {}
