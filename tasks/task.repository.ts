import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/getTasksFilter.dto";
import { TasksStatus } from "./task-status.enum";
import { Task } from "./task.entity";

  @EntityRepository(Task)
  export class TaskRepository extends Repository<Task>{
    async getTasks(user : User ,
      filterDto: GetTasksFilterDto,): Promise<Task[]> {
      const { status, search } = filterDto;
      const query = this.createQueryBuilder('task');
      query.where('task.userId = :userId', {userId: user.id})
      if (status) {
        query.andWhere('task.status = :status', { status });
      }

      if (search) {
        query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
      }
      const tasks = await query.getMany();
      return tasks;
    }
    async createTask(createTaskDto: CreateTaskDto,
      user : User
      ): Promise<Task> {
      const { title, description } = createTaskDto;
      // console.log(user);
      const task = new Task();
      task.title = title;
      task.description = description;
      task.status = TasksStatus.OPEN;
      task.user = user;
      // console.log(task)
      await task.save();
      delete task.user;
      return task;
    }
  }