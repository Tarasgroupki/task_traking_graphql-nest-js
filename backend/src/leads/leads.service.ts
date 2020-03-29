import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {LeadsDto} from './leads.dto';
import {Lead} from './lead.entity';
import {Repository} from 'typeorm';

@Injectable()
export class LeadsService {
    constructor(@InjectRepository(Lead) private readonly leadRepository: Repository<Lead>) {

    }

    async findAll(): Promise<Lead[]> {
        return await this.leadRepository.find({
            relations: ['client', 'user'],
        });
    }

    async findOneByName(title: string): Promise<Lead[]> {
        return await this.leadRepository.find({title});
    }

    async findMax() {
       return await this.leadRepository.createQueryBuilder()
            .select('MAX(id)', 'max')
            .getRawOne();
    }

    async showBySprint(sprintId: number) {
        return await this.leadRepository.find({
            where: {id: sprintId},
        });
    }

    async findOne(id): Promise<Lead[]> {
        return await this.leadRepository.find({id: id.id});
    }

    async createLead(data: LeadsDto): Promise<Lead> {
        const lead = new Lead();

        lead.title = data.title;
        lead.description = data.description;
        lead.status = data.status;
        lead.user_assigned_id = data.user_assigned;
        lead.client_id = data.client;
        lead.user_created_id = data.user_assigned;
        lead.contact_date = data.contact_date;

        await this.leadRepository.save(lead);

        return lead;
    }

    async delete(id: number) {
        const lead = await this.leadRepository.find({id});

        await this.leadRepository.remove(lead[0]);
        return true;
    }

    async deleteAll(idArr: any) {
        await this.leadRepository.delete(idArr);
        return true;
    }

    async update(data: LeadsDto): Promise<Lead> {
        const lead = await this.leadRepository.find({id: data.id});
        lead[0].title = data.title;
        lead[0].description = data.description;
        lead[0].status = data.status;
        lead[0].user_assigned_id = data.user_assigned;
        lead[0].client_id = data.client;
        lead[0].user_created_id = data.user_assigned;
        lead[0].contact_date = data.contact_date;

        await this.leadRepository.save(lead[0]);

        return lead[0];
    }
}
