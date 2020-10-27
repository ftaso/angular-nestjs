import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { TimeFixedServiceService } from './time-fixed-service.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('time-fixed-service')
export class TimeFixedServiceController {

    constructor(private readonly timeFixedServiceService: TimeFixedServiceService) { }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    getRecord(@Param('id') id): object {
        return this.timeFixedServiceService.find(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body() body: any, @Res() res: any): Promise<any> {
        const model = await this.timeFixedServiceService.post(body);
        return res.status(200).send(
            {
                message: 'post data!',
                new_id_timeFixedService: model.id_timeFixedService
            });
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async update(@Body() body: any, @Res() res: any): Promise<any> {
        await this.timeFixedServiceService.put(body);
        return res.status(200).send({ message: 'put data!' });
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async delete(@Param('id') id, @Res() res: any): Promise<any> {
        await this.timeFixedServiceService.delete(id);
        return res.status(200).send({ message: 'delete data!' });
    }
}
