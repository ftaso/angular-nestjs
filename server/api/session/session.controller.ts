import { Controller, Get, Param, UseGuards, Post } from '@nestjs/common';
import { SessionService } from './session.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('session')
export class SessionController {

    constructor(private readonly sessionService: SessionService) { }

    // @Get(':id')
    // async get(@Param() params: any): Promise<any> {
    //     return await this.sessionService.findOne(params.id);
    // }

    // @UseGuards(JwtAuthGuard)
    // @Post()
    // async checkSessionId(): Promise<any> {
    // }

    // @UseGuards(JwtAuthGuard)
    // @Delete('/:id')
    // async delete(@Param('id') id, @Res() res: any): Promise<any> {
    //     await this.serviceDetailService.delete(id);
    //     return res.status(200).send({ message: 'delete data!' });
    // }
}
