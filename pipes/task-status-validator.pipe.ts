import { ArgumentMetadata, BadRequestException, PipeTransform,  } from "@nestjs/common";
import { TasksStatus } from "../tasks/task";
export class TasksStatusValidatorPipe implements PipeTransform {
    
    readonly allowedStatuses = [
        TasksStatus.OPEN,
        TasksStatus.IN_PROGRESS,
        TasksStatus.DONE,
    ];
    transform(value:any, metadata: ArgumentMetadata): any {
        
        value = value.toUpperCase();
        // console.log(value);
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`${value} is an invalid status`);
        return value;
    }
}
    private isStatusValid(status: any): boolean {
        
        const idx =  this.allowedStatuses.indexOf(status);
        return idx > -1;
    }
}
