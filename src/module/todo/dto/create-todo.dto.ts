import { IsNotEmpty } from "class-validator";


export enum TodoStatus {
    COMPLETED = 'completed',
    WIP = 'wip',
    OPEN= 'open'
}

export class CreateTodoDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    status: TodoStatus;
    
}