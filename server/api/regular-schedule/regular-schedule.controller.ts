import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { RegularScheduleService } from './regular-schedule.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('regular-schedule')
export class RegularScheduleController {

    constructor(private readonly regularScheduleService: RegularScheduleService) { }


    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(): Promise<any> {
        return await this.regularScheduleService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('day/:day')
    getFromParam(@Param() Param: any): object {
        return this.regularScheduleService.findFromParam(Param.day);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() body: any, @Res() res: any): Promise<object> {
        await this.regularScheduleService.post(body);
        return res.status(200).send({ message: 'post data!' });
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async update(
        @Body() body: any,
        @Res() res: any,
    ): Promise<object> {
        await this.regularScheduleService.put(body);
        return res.status(200).send({ message: 'put data!' });
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async delete(@Param('id') id, @Res() res: any): Promise<object> {
        await this.regularScheduleService.delete(id);
        return res.status(200).send({ message: 'delete data!' });
    }
}
