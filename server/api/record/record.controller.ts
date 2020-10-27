import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { RecordService } from './record.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('record')
export class RecordController {

    today = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;

    constructor(private readonly recordService: RecordService) { }

    @Get()
    getHello(): string {
        return JSON.stringify(this.recordService.getRecord());
    }

    @UseGuards(JwtAuthGuard)
    @Get('today')
    async getToday(today): Promise<any> {
        return await this.recordService.findOne(today);
    }

    @UseGuards(JwtAuthGuard)
    @Get('date/:date')
    async getSelectedDate(@Param() params: any): Promise<any> {
        return await this.recordService.findDate(params.date);
    }


    // @UseGuards(JwtAuthGuard)
    @Get('test')
    getTest(): object {
        return this.recordService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('param/:id')
    getFromParam(@Param() Param: any): object {
        return this.recordService.findFromParam(Param.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() body: any, @Res() res: any) {
        await this.recordService.post(body);
        return res.status(200).send({ message: 'post data!' });
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async update(
        @Body() body: any,
        @Res() res: any,
    ) {
        await this.recordService.put(body);
        return res.status(200).send({ message: 'put data!' });
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async delete(@Param('id') id, @Res() res: any) {
        await this.recordService.delete(id);
        return res.status(200).send({ message: 'delete data!' });
    }
}
