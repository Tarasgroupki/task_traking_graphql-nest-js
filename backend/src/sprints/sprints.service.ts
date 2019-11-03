
import { Injectable, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Sprint } from './sprint.entity';
import { Repository } from 'typeorm';
import {Task} from '../tasks/task.entity';

@Injectable()
export class SprintsService {
    constructor(@InjectRepository(Sprint) private readonly sprintRepository: Repository<Sprint>) {

       // super(repo);
    }

    async findAll(): Promise<Sprint[]> {
        return await this.sprintRepository.find({
            relations: ['lead', 'user']
        });
    }

    async showByTask(taskId: number) {
        const tasks = await this.sprintRepository.find({
            where: {id: taskId},
            // relations: ['leads']
        });
        // console.log(clients);
        return tasks.map(tasks => tasks);
    }

    async findOne(id): Promise<Sprint[]> {
        return await this.sprintRepository.find({id: id.id});
    }

   /* async findAll(): Promise<Client[]> {
        return await this.clientRepository.find();
    }
    async findOne(id): Promise<Client[]> {
        return await this.clientRepository.find(id);
    }
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
    }*/
}
