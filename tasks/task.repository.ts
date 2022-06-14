import { EntityRepository, Repository } from "typeorm";
import { TasksStatus } from "./task-status.enum";
import { Task } from "./task.entity";

  @EntityRepository(Task)
  export class TaskRepository extends Repository<Task>{
    
  }