import { Body, Controller, Get, Post } from '@nestjs/common';
import { get } from 'http';
import { TasksService } from './tasks.service';
import { Task } from './task';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService : TasksService){}
    
    @Get()
    getAllTasks() : Task[]    {
        return this.tasksService.getAllTasks();
    }
    @Post()
    createTask(@Body() CreateTaskDto : CreateTaskDto) : Task {

        return this.tasksService.createTask(CreateTaskDto);
    }
    // ) : Task
    // {
    //     return this.tasksService.createTask(title, description);
    // }
}

