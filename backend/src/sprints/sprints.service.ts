import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Sprint} from './sprint.entity';
import {Repository} from 'typeorm';

@Injectable()
export class SprintsService {
    constructor(@InjectRepository(Sprint) private readonly sprintRepository: Repository<Sprint>) {

    }

    async findAll(): Promise<Sprint[]> {
        return await this.sprintRepository.find({
            relations: ['lead', 'user'],
        });
    }

    async showByTask(taskId: number) {
        return await this.sprintRepository.find({
            where: {id: taskId},
        });
    }

    async findOne(id): Promise<Sprint[]> {
        return await this.sprintRepository.find({id: id.id});
    }
}
