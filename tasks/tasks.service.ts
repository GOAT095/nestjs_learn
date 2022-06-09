import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksStatus , Task} from './task';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/getTasksFilter.dto';

@Injectable()
export class TasksService {
    private tasks : Task[] = [];
    
    getAllTasks() : Task[] {
        return this.tasks;
    }
    getTasksByStatus(filterDto : GetTasksFilterDto) : Task[] {
        
        let {status, search} = filterDto;
        let tasks = this.getAllTasks();
        search = search.toLowerCase();
        if (status) {
            tasks = tasks.filter(task => task.status.toString().toLowerCase() == status.toString().toLowerCase());
        }
        console.log(status, search, tasks);
        if (search) {
            tasks = tasks.filter(task => task.title.toLowerCase().includes(search) || task.description.toLowerCase().includes(search));
        }
        console.log(tasks);
        return tasks;
    }
    getTaskById(id : string) : Task {   
        const found = this.tasks.find(task => task.id === id);
        if (!found)
        {    
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        return found;
    }
    createTask(CreateTaskDto :CreateTaskDto): Task{
        const {title, description} = CreateTaskDto;
        const task : Task = {
            id : uuid.v4(),
            title,
            description,
            status : TasksStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
    }
    deleteTask(id : string) : void {
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id !== id);
    }
    updateTaskStatus(id : string, status : TasksStatus) : Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}