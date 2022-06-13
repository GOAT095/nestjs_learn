
import { IsOptional, IsNotEmpty, IsIn} from "class-validator";
import { TasksStatus } from "../task-status.enum";

export class GetTasksFilterDto {
  @IsOptional()
  @IsIn(Object.values(TasksStatus))
  status : TasksStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
