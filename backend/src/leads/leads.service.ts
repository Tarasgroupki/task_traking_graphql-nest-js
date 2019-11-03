
import { Injectable, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { LeadsDto } from './leads.dto';
import { LeadsRO } from './leads.dto';
import { ClientsRO } from '../clients/clients.dto';
import { Lead } from './lead.entity';
import { Repository } from 'typeorm';
import {SprintsService} from '../sprints/sprints.service';
import {Sprint} from '../sprints/sprint.entity';

@Injectable()
export class LeadsService {
    constructor(@InjectRepository(Lead) private readonly leadRepository: Repository<Lead>) {

        // super(repo);
    }

   /* private leadToResponceObject(lead: Lead): LeadsRO {
        const responceObject: any = {
            ...lead,
            client: lead.client,
        }
    }*/

    async findAll(): Promise<Lead[]> {
        return await this.leadRepository.find({
            relations: ['client', 'user']
        });
    }

    async findOneByName(title: string): Promise<Lead[]> {
        const lead = await this.leadRepository.find({title: title});
         console.log(title);
        return lead;
    }

    async findMax() {
       return await this.leadRepository.createQueryBuilder()
            .select('MAX(id)', 'max')
            .getRawOne();
    }

    async showBySprint(sprintId: number) {
        const sprints = await this.leadRepository.find({
            where: {id: sprintId},
            // relations: ['leads']
        });
        // console.log(clients);
        return sprints.map(sprints => sprints);
    }

    async findOne(id): Promise<Lead[]> {
        const lead = await this.leadRepository.find({id: id.id});
       // console.log(lead);
        return lead;
    }

    async createLead(data: LeadsDto): Promise<Lead> {
        const lead = new Lead();
        console.log(data);
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
        const lead = await this.leadRepository.find({id: id});

        await this.leadRepository.remove(lead[0]);
        return true;
    }

    async deleteAll(id_arr: any) {
        console.log(id_arr);
        await this.leadRepository.delete(id_arr);
        return true;
    }

    async update(data: LeadsDto): Promise<Lead> {
        const lead = await this.leadRepository.find({id: data.id});
        console.log(data);
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
