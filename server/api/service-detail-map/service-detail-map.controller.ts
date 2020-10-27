import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ServiceDetailMapService } from './service-detail-map.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('service-detail-map')
export class ServiceDetailMapController {

    constructor(private readonly serviceDetailMapService: ServiceDetailMapService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body() body: any, @Res() res: any): Promise<any> {
        const serviceDetailData = JSON.parse(body.serviceDetails);
        await this.serviceDetailMapService.delete(Number(body.id_service));
        const model = await this.serviceDetailMapService.post(serviceDetailData);
        return res.status(200).send(
            {
                message: 'post data!',
            });
    }

}
