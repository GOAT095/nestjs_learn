import { Injectable } from '@nestjs/common';
import { TasksStatus , Task} from './task';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks : Task[] = [];
    
    getAllTasks() : Task[] {
        return this.tasks;
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
}