import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Client} from './client.entity';
import {Repository} from 'typeorm';
import {ClientsDto} from './clients.dto';

@Injectable()
export class ClientsService {
    constructor(@InjectRepository(Client) private readonly clientRepository: Repository<Client>) {

    }

    async showByLead(leadId: number) {
        return await this.clientRepository.find({
            where: {id: leadId},
        });
    }

    async findAll(): Promise<Client[]> {
        return await this.clientRepository.find({
            relations: ['leads', 'user'],
        });
    }
    async findOne(id): Promise<Client[]> {
        const idVal = id.id ? id.id : id;
        return await this.clientRepository.find({id: idVal});
    }

    async createClient(data: ClientsDto): Promise<Client> {
        const client = new Client();
        client.name = data.name;
        client.email = data.email;
        client.primary_number = data.primary_number;
        client.secondary_number = data.secondary_number;
        client.address = data.address;
        client.zipcode = data.zipcode;
        client.city = data.city;
        client.company_name = data.company_name;
        client.vat = data.vat;
        client.company_type = data.company_type;
        client.user_id = data.user;

        await this.clientRepository.save(client);

        return client;
    }

    async delete(id: number) {
        const client = await this.clientRepository.find({id});

        await this.clientRepository.remove(client[0]);
        return true;
    }

    async deleteAll(idArr: any) {
        await this.clientRepository.delete(idArr);
        return true;
    }

    async update(data: ClientsDto): Promise<Client> {
        const client = await this.clientRepository.find({id: data.id});

        client[0].name = data.name;
        client[0].email = data.email;
        client[0].primary_number = data.primary_number;
        client[0].secondary_number = data.secondary_number;
        client[0].address = data.address;
        client[0].zipcode = data.zipcode;
        client[0].city = data.city;
        client[0].company_name = data.company_name;
        client[0].vat = data.vat;
        client[0].company_type = data.company_type;
        client[0].user_id = data.user;

        await this.clientRepository.save(client[0]);

        return client[0];
    }
}
