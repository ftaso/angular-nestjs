import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { MealService } from './meal.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('meal')
export class MealController {

    today = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;

    constructor(private readonly mealservice: MealService) { }

    @Get()
    getHello(): string {
        return JSON.stringify(this.mealservice.getMeal());
    }

    @UseGuards(JwtAuthGuard)
    @Get('today')
    getTest(): object {
        return this.mealservice.findToday(this.today);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body() body: any, @Res() res: any): Promise<any> {
        await this.mealservice.post(body);
        return res.status(200).send({ message: 'post data!' });
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async update(@Body() body: any, @Res() res: any): Promise<any> {
        await this.mealservice.put(body);
        return res.status(200).send({ message: 'put data!' });
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async delete(@Param('id') id, @Res() res: any): Promise<any> {
        await this.mealservice.delete(id);
        return res.status(200).send({ message: 'delete data!' });
    }
}
