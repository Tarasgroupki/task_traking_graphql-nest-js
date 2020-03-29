
import { Injectable, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import {User} from '../users/user.entity';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(Task) private readonly taskRepository: Repository<Task>) {

    }

    async findAll(): Promise<Task[]> {
        return await this.taskRepository.find({
            relations: ['sprint', 'user'],
        });
    }
    async findOne(id): Promise<Task[]> {
        return await this.taskRepository.find({id: id.id});
    }
}
