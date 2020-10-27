import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { StaffService } from './staff.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('staff')
export class StaffController {
    constructor(private readonly staffservice: StaffService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllStaff(): object {
        return this.staffservice.findAll();
    }

    // @UseGuards(JwtAuthGuard)
    @Get('test')
    getTest(): object {
        return this.staffservice.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('param/:id')
    getFromParam(@Param() Param: any): object {
        return this.staffservice.findFromParam(Param.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() body: any, @Res() res: any) {
        await this.staffservice.post(body);
        return res.status(200).send({ message: 'post data!' });
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async update(
        @Body() body: any,
        @Res() res: any,
    ) {
        await this.staffservice.put(body);
        return res.status(200).send({ message: 'put data!' });
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async delete(@Param('id') id, @Res() res: any) {
        await this.staffservice.delete(id);
        return res.status(200).send({ message: 'delete data!' });
    }
}

