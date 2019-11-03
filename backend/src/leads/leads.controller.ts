
import { Controller, Get, Post, Put, Delete, Header, Param } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Lead } from './lead.entity';
import { LeadsService } from './leads.service';

@Crud({
    model: {
        type: Lead,
    },
})
@Controller('leads')
export class LeadsController {
    constructor(public service: LeadsService) {}

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
