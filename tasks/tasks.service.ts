import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TasksStatus } from './task-status.enum';
import { Connection } from 'typeorm';
import { GetTasksFilterDto } from './dto/getTasksFilter.dto';
import { User } from 'src/auth/user.entity';
@Injectable()
export class TasksService {
    private   taskRepository: TaskRepository;

    
constructor(
    // @InjectRepository(TaskRepository)
    // private taskRepository: TaskRepository,
    private readonly connection: Connection){
    this.taskRepository = connection.getCustomRepository(TaskRepository);
}
    // private tasks : Task[] = [];
    
    async getTasks(user : User,
      filterDto: GetTasksFilterDto) : Promise<Task[]> {
        return this.taskRepository.getTasks(user,filterDto);
    }
    // getTasksByStatus(filterDto : GetTasksFilterDto) : Task[] {
        
    //     let {status, search} = filterDto;
    //     let tasks = this.getAllTasks();
    //     search = search.toLowerCase();
    //     if (status) {
    //         tasks = tasks.filter(task => task.status.toString().toLowerCase() == status.toString().toLowerCase());
    //     }
    //     console.log(status, search, tasks);
    //     if (search) {
    //         tasks = tasks.filter(task => task.title.toLowerCase().includes(search) || task.description.toLowerCase().includes(search));
    //     }
    //     console.log(tasks);
    //     return tasks;
    // }

    async getTaskById(id: number, user : User): Promise<Task> {
        const found = await this.taskRepository.findOne({where: {id, userId: user.id}});
    
        if (!found) {
          throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return found;
      }
    async createTask(createTaskDto: CreateTaskDto,
      user : User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user);
      }
    // async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
    //    const {title, description} = createTaskDto;
    //     const task = new Task();
    //     task.title = title;
    //     task.description = description;
    //     task.status = TasksStatus.OPEN;
    //     await task.save();
    //     return task;
    // }
    async deleteTask(id: number, user: User): Promise<boolean> {
        // const task = await this.taskRepository.findOne(id);
        const res = await this.taskRepository.delete({id, userId: user.id});
        return (res.affected === 1);
        
      }
    
    // getTaskById(id : string) : Task {   
    //     const found = this.tasks.find(task => task.id === id);
    //     if (!found)
    //     {
    //         throw new NotFoundException(`Task with id ${id} not found`);
    //     }
    //     return found;
    // }
    // createTask(CreateTaskDto :CreateTaskDto): Task{
    //     const {title, description} = CreateTaskDto;
    //     const task : Task = {
    //         id : uuid.v4(),
    //         title,
    //         description,
    //         status : TasksStatus.OPEN,
    // };
    // this.tasks.push(task);
    // return task;
    // }
    // deleteTask(id : string) : void {
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task => task.id !== id);
    // }
    async updateTaskStatus(id : number, status : TasksStatus, user:User) : Promise<Task> {
      const task = await this.getTaskById(id, user);
      task.status = status;
      await task.save();
      return task;
    }
}