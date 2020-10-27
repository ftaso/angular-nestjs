import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ServiceTagService } from './service-tag.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('service-tag')
export class ServiceTagController {
    today = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;

    constructor(private readonly serviceTagService: ServiceTagService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    get(): object {
        return this.serviceTagService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body() body: any, @Res() res: any): Promise<any> {
        await this.serviceTagService.post(body);
        return res.status(200).send({ message: 'post data!' });
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async update(@Body() body: any, @Res() res: any): Promise<any> {
        await this.serviceTagService.put(body);
        return res.status(200).send({ message: 'put data!' });
    }

    @UseGuards(JwtAuthGuard)
    @Put('multiple')
    async updateMultiple(@Body() body: any, @Res() res: any): Promise<any> {
        await this.serviceTagService.putMultiple(body);
        return res.status(200).send({ message: 'put data!' });
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async delete(@Param('id') id, @Res() res: any): Promise<any> {
        await this.serviceTagService.delete(id);
        return res.status(200).send({ message: 'delete data!' });
    }
}
