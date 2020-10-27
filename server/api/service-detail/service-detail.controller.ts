import { Body, Controller, Delete, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ServiceDetailService } from './service-detail.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('service-detail')
export class ServiceDetailController {

    today = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;

    constructor(private readonly serviceDetailService: ServiceDetailService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    get(): object {
        return this.serviceDetailService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body() body: any, @Res() res: any): Promise<any> {
        const model = await this.serviceDetailService.post(body);
        return res.status(200).send(({
            message: 'post data!',
            new_id_serviceDetail: model.id_serviceDetail
        }));
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async update(@Body() body: any, @Res() res: any): Promise<any> {
        await this.serviceDetailService.put(body);
        return res.status(200).send({ message: 'put data!' });
    }

    @UseGuards(JwtAuthGuard)
    @Put('multiple')
    async updateMultiple(@Body() body: any, @Res() res: any): Promise<any> {
        await this.serviceDetailService.putMultiple(body);
        return res.status(200).send({ message: 'put data!' });
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async delete(@Param('id') id, @Res() res: any): Promise<any> {
        await this.serviceDetailService.delete(id);
        return res.status(200).send({ message: 'delete data!' });
    }
}
