import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { CareReceiverService } from './care-receiver.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('care-receiver')
export class CareReceiverController {
    constructor(private readonly service: CareReceiverService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(): object {
        return this.service.findAll();
    }

    // @UseGuards(JwtAuthGuard)
    @Get('test')
    getTest(): object {
        return this.service.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('param/:id')
    getFromParam(@Param() Param: any): object {
        return this.service.findFromParam(Param.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() body: any, @Res() res: any) {
        await this.service.post(body);
        return res.status(200).send({ message: 'post data!' });
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async update(
        @Body() body: any,
        @Res() res: any,
    ) {
        await this.service.put(body);
        return res.status(200).send({ message: 'put data!' });
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async delete(@Param('id') id, @Res() res: any) {
        await this.service.delete(id);
        return res.status(200).send({ message: 'delete data!' });
    }
}
