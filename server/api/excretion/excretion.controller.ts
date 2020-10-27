import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ExcretionService } from './excretion.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('excretion')
export class ExcretionController {
    today = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;

    constructor(private readonly excretionservice: ExcretionService) { }

    @UseGuards(JwtAuthGuard)
    @Get('today')
    getTest(): object {
        return this.excretionservice.findToday(this.today);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body() body: any, @Res() res: any): Promise<any> {
        await this.excretionservice.post(body);
        return res.status(200).send({ message: 'post data!' });
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async update(@Body() body: any, @Res() res: any): Promise<any> {
        await this.excretionservice.put(body);
        return res.status(200).send({ message: 'put data!' });
    }

    @UseGuards(JwtAuthGuard)
    @Put('multiple')
    async updateMultiple(@Body() body: any, @Res() res: any): Promise<any> {
        await this.excretionservice.putMultiple(body);
        return res.status(200).send({ message: 'put data!' });
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async delete(@Param('id') id, @Res() res: any): Promise<any> {
        await this.excretionservice.delete(id);
        return res.status(200).send({ message: 'delete data!' });
    }
}
