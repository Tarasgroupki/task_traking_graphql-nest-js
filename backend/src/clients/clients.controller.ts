
import { Controller, Get, Post, Put, Delete, Header, Param, SetMetadata } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Client } from './client.entity';
import { ClientsService } from './clients.service';

@Crud({
    model: {
        type: Client,
    },
})
@Controller('clients')
@SetMetadata('permissions', ['create tasks'])
export class ClientsController {
    constructor(public service: ClientsService) {}

  /*  @Get()
    findAll(): Promise<Client[]> {
        return this.clientService.findAll();
    }

    @Get(':id')
    findOne(@Param() params): Promise<Client[]> {
        console.log(params.id);
        return this.clientService.findOne(params.id);
    }

    @Post()
    @Header('Cache-Control', 'none')
    create() {
        return 'This action adds a new cat';
    }*/
}
