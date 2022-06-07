import { TasksStatus } from "../task";

export class GetTasksFilterDto {
  status : TasksStatus;
  search: string;
}
