import { userInfo } from 'os';
import { User } from 'src/auth/user.entity';
import {Entity, PrimaryGeneratedColumn, BaseEntity, Column, ManyToMany, ManyToOne} from 'typeorm';
import { TasksStatus } from './task-status.enum';


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

	@ManyToOne(type => User, user => user.tasks, {eager : false})
	user: User;
}

