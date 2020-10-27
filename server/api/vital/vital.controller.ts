import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { VitalService } from './vital.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('vital')
export class VitalController {

    today = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;

    constructor(private readonly vitalservice: VitalService) { }

    @UseGuards(JwtAuthGuard)
    @Get('today')
    getTest(): object {
        return this.vitalservice.findToday(this.today);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body() body: any, @Res() res: any): Promise<any> {
        await this.vitalservice.post(body);
        return res.status(200).send({ message: 'post data!' });
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async update(@Body() body: any, @Res() res: any): Promise<any> {
        await this.vitalservice.put(body);
        return res.status(200).send({ message: 'put data!' });
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async delete(@Param('id') id, @Res() res: any): Promise<any> {
        await this.vitalservice.delete(id);
        return res.status(200).send({ message: 'delete data!' });
    }
}

