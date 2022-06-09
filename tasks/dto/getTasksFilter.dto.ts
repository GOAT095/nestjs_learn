import { TasksStatus } from "../task";
import { IsOptional, IsNotEmpty, IsIn} from "class-validator";

export class GetTasksFilterDto {
  @IsOptional()
  @IsIn(Object.values(TasksStatus))
  status : TasksStatus;
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
