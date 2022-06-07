import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { get } from 'http';
import { TasksService } from './tasks.service';
import { Task, TasksStatus } from './task';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/getTasksFilter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService : TasksService){}
    
    @Get()
    getAllTasks(@Query() filterDto : GetTasksFilterDto) : Task[]{
        if (filterDto.status && filterDto.search)
            return this.tasksService.getTasksByStatus(filterDto);
        return this.tasksService.getAllTasks();
    }
    // @Get()
    // getTasksByStatus(@Query() filterDto : GetTasksFilterDto) : Task[] {
    //     console.log("test");
    //     return this.tasksService.getTasksByStatus(filterDto);
    // }
    @Get('/:id')
    getTaskById(@Param('id') id : string) : Task {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() CreateTaskDto : CreateTaskDto) : Task {

        return this.tasksService.createTask(CreateTaskDto);
    }
    @Delete('/:id')
    deleteTask(@Param('id') id : string) : void {
        this.tasksService.deleteTask(id);
    }
    @Patch('/:id/status')
    updateTaskStatus(
    @Param('id') id : string,
    @Body('status') status : TasksStatus,) : Task {
        return this.tasksService.updateTaskStatus(id, status);
        
    }
}

