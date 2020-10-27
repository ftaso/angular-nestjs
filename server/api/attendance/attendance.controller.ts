import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('attendance')
export class AttendanceController {

    today = `${new Date().getFullYear()}-${new Date().getMonth() - 1}-${new Date().getDate()}`;

    constructor(private readonly attendanceService: AttendanceService) { }

    @Get()
    getHello(): string {
        return JSON.stringify(this.attendanceService.getRecord());
    }

    @UseGuards(JwtAuthGuard)
    @Get('today')
    async getToday(today): Promise<any> {
        return await this.attendanceService.findOne(today);
    }

    // @UseGuards(JwtAuthGuard)
    @Get('date:/date')
    getSelectedDate(@Param() Param: any): object {
        console.log(this.attendanceService.findOne(Param.date))
        return this.attendanceService.findOne(Param.date);
    }


    // @UseGuards(JwtAuthGuard)
    @Get('test')
    getTest(): object {
        return this.attendanceService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('param/:id')
    getFromParam(@Param() Param: any): object {
        return this.attendanceService.findFromParam(Param.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() body: any, @Res() res: any) {
        await this.attendanceService.post(body);
        return res.status(200).send({ message: 'post data!' });
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async update(
        @Body() body: any,
        @Res() res: any,
    ) {
        await this.attendanceService.put(body);
        return res.status(200).send({ message: 'put data!' });
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async delete(@Param('id') id, @Res() res: any) {
        await this.attendanceService.delete(id);
        return res.status(200).send({ message: 'delete data!' });
    }
}
