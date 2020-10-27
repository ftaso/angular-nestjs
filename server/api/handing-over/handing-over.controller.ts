import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { HandingOverService } from './handing-over.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('handing-over')
export class HandingOverController {

    constructor(private readonly handingOverService: HandingOverService) { }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    getRecord(@Param('id') id): object {
        return this.handingOverService.find(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body() body: any, @Res() res: any): Promise<any> {
        const model = await this.handingOverService.post(body);
        return res.status(200).send(
            {
                message: 'post data!',
                new_id_handingOver: model.id_handingOver
            });
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async update(@Body() body: any, @Res() res: any): Promise<any> {
        await this.handingOverService.put(body);
        return res.status(200).send({ message: 'put data!' });
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async delete(@Param('id') id, @Res() res: any): Promise<any> {
        await this.handingOverService.delete(id);
        return res.status(200).send({ message: 'delete data!' });
    }
}
