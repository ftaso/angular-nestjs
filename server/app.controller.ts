import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './api/auth/local-auth.guard';
import { AuthService } from './api/auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  getTest(): string {
    return this.appService.getTest();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() request, @Res() response: any): Promise<any> {
    // 旧
    // return this.authService.login(req.body);
    const {staff} = request;
    const cookie = this.authService.getCookiesJwtToken(request.body);
    response.setHeader('Set-Cookie', cookie);
    response.cookie('test', cookie)
    console.log('response', response)
    return response.status(200).send({ message: 'post data!' });

  }

}
