
import { Controller, Get, Post, Put, Delete, Header, Param } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Crud({
    model: {
        type: Task,
    },
})
@Controller('tasks')
export class TasksController {
    constructor(public service: TasksService) {}

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
