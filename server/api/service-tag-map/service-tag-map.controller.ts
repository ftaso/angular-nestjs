import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ServiceTagMapService } from './service-tag-map.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('service-tag-map')
export class ServiceTagMapController {

    constructor(private readonly serviceTagMapService: ServiceTagMapService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body() body: any, @Res() res: any): Promise<any> {
        const model = await this.serviceTagMapService.post(body);
        return res.status(200).send(
            {
                message: 'post data!',
                new_id_serviceTag_map: model.id_serviceTag_map
            });
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async update(@Body() body: any, @Res() res: any): Promise<any> {
        await this.serviceTagMapService.put(body);
        return res.status(200).send({ message: 'put data!' });
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async delete(@Param('id') id, @Res() res: any): Promise<any> {
        await this.serviceTagMapService.delete(id);
        return res.status(200).send({ message: 'delete data!' });
    }
}
