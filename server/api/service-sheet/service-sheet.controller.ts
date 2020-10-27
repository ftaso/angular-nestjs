import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ServiceSheetService } from './service-sheet.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('service-sheet')
export class ServiceSheetController {

    constructor(private readonly serviceSheetService: ServiceSheetService) { }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    getRecord(@Param('id') id): object {
        return this.serviceSheetService.findOne(id);
    }

}
