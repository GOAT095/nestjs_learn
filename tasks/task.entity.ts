import {Entity, PrimaryGeneratedColumn, BaseEntity, Column} from 'typeorm';
import { TasksStatus } from './task';

@Entity()
export class Task extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;
	@Column()
	title: string;
	@Column()
	description: string;
	@Column()
	status: TasksStatus;
}

