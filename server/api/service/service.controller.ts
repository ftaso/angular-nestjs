import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ServiceService } from './service.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('service')
export class ServiceController {

    constructor(private readonly serviceService: ServiceService) { }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    getRecord(@Param('id') id): object {
        return this.serviceService.find(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body() body: any, @Res() res: any): Promise<any> {
        const model = await this.serviceService.post(body);
        return res.status(200).send(
            {
                message: 'post data!',
                new_id_service: model.id_service
            });
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async update(@Body() body: any, @Res() res: any): Promise<any> {
        await this.serviceService.put(body);
        return res.status(200).send({ message: 'put data!' });
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async delete(@Param('id') id, @Res() res: any): Promise<any> {
        await this.serviceService.delete(id);
        return res.status(200).send({ message: 'delete data!' });
    }
}
