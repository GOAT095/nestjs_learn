import { Controller, Get } from '@nestjs/common';
import { get } from 'http';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService : TasksService){}
    
    @Get()
    getAllTasks() {
        return this.tasksService.getAllTasks();
    }
}

