import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksStatusValidatorPipe } from 'src/pipes/task-status-validator.pipe';
import { TasksStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService : TasksService){}
    
    
    @Get(':id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    // @Get()
    // getAllTasks(@Query() filterDto : GetTasksFilterDto) : Task[]{
    //     if (Object.keys(filterDto).length)
    //         return this.tasksService.getTasksByStatus(filterDto);
    //     return this.tasksService.getAllTasks();
    // }
    // // @Get()
    // // getTasksByStatus(@Query() filterDto : GetTasksFilterDto) : Task[] {
    // //     console.log("test");
    // //     return this.tasksService.getTasksByStatus(filterDto);
    // // }
    // @Get('/:id')
    // getTaskById(@Param('id') id : string) : Task {
    //     return this.tasksService.getTaskById(id);
    // }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() CreateTaskDto : CreateTaskDto) : Promise<Task> {

        return this.tasksService.createTask(CreateTaskDto);
    }
    @Delete('/:id')
    deleteTask(@Param('id') id : number) : Promise<boolean> {
       return  this.tasksService.deleteTask(id);
        
    }
    @Patch('/:id/status')
    updateTaskStatus (
    @Param('id', ParseIntPipe) id : number,
    @Body('status', TasksStatusValidatorPipe) status : TasksStatus) : Promise<Task> {
        return this.tasksService.updateTaskStatus(id, status);
        
    }
}

