import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksStatusValidatorPipe } from 'src/pipes/task-status-validator.pipe';
import { TasksStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/getTasksFilter.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService : TasksService){}
    
    
    // @Get(':id')
    // getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    //     return this.tasksService.getTaskById(id);
    // }

    @Get()
    async getAllTasks(@Query(ValidationPipe) filterDto : GetTasksFilterDto) : Promise<Task[]>
    {
        return this.tasksService.getTasks(filterDto);
    }
    // @Get()
    // getTasksByStatus(@Query() filterDto : GetTasksFilterDto) : Task[] {
    //     console.log("test");
    //     return this.tasksService.getTasksByStatus(filterDto);
    // }
    // @Get('/:id')
    // getTaskById(@Param('id') id : string) : Task {
    //     return this.tasksService.getTaskById(id);
    // }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() CreateTaskDto : CreateTaskDto, 
        @GetUser() user : User,) : Promise<Task> {

        return this.tasksService.createTask(CreateTaskDto, user);
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
    @Get()
    getTasks(
        @Param('status', TasksStatusValidatorPipe) status: TasksStatus,
    ){
        
    }
}

