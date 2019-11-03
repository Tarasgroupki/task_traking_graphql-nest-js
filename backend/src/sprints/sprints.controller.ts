
import { Controller, Get, Post, Put, Delete, Header, Param } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Sprint } from './sprint.entity';
import { SprintsService } from './sprints.service';

@Crud({
    model: {
        type: Sprint,
    },
})
@Controller('leads')
export class SprintsController {
    constructor(public service: SprintsService) {}

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
