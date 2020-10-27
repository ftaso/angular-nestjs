import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ServiceTypeService } from './service-type.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('service-type')
export class ServiceTypeController {

    constructor(
        private readonly serviceTypeService: ServiceTypeService
    ) {

    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body() body: any, @Res() res: any): Promise<any> {
        const model = await this.serviceTypeService.post(body);
        return res.status(200).send({
            message: 'post data!',
            new_id_serviceType: model.id_serviceType
        });
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async update(@Body() body: any, @Res() res: any): Promise<any> {
        await this.serviceTypeService.put(body);
        return res.status(200).send({ message: 'put data!' });
    }


    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async delete(@Param('id') id, @Res() res: any): Promise<any> {
        await this.serviceTypeService.delete(id);
        return res.status(200).send({ message: 'delete data!' });
    }
}
