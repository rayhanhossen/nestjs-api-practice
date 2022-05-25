import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum TodoStatus {
    COMPLETED = 'completed',
    WIP = 'wip',
    OPEN= 'open'
}

@Entity('todo')
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({type: 'enum', enum: TodoStatus, default: TodoStatus.WIP})
    status: TodoStatus;

    @Column({ default: false })
    isDeleted: boolean;

}

