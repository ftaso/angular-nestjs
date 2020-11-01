import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './api/auth/local-auth.guard';
import { AuthService } from './api/auth/auth.service';
import { SessionService } from './api/session/session.service';
import { JwtAuthGuard } from './api/auth/jwt-auth.guard';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly sessionService: SessionService
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  getTest(): string {
    return 'testtest';
    // return this.appService.getTest();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() request, @Res() response: any): Promise<any> {
    // 旧
    // return this.authService.login(req.body);
    const userData = await this.authService.login(request.body);
    if (userData.auth) {
      const cookie = this.authService.getCookiesJwtToken(userData);
      console.log(cookie);
      response.setHeader('Set-Cookie', cookie);
      const sessionId = this.authService.publishSessionId(userData);
      response.cookie('Session-Id', sessionId);
      return response.status(200).send(userData);
    } else {
      return response.status(401).send();
    }
  }

  @Post('auth/logout')
  async logout(@Req() request, @Res() response: any): Promise<any> {
    console.log('logout start!');
    if (request.headers.cookie) {
      // Cookieに情報がある場合は
      response.clearCookie('Authentication', request);
      const sessionId = this.getCookie('Session-Id', request);
      if (sessionId) {
        await this.sessionService.delete(sessionId);
        response.clearCookie('Session-Id', request);
      }
      return response.status(200).send({message: 'logout complete!'});
    } else {
      // cookiez情報がない場合は
      return response.status(200).send({message: 'logout complete!'});
    }
  }

  @Post('auth/session')
  async checkSession(@Req() request, @Res() response: any): Promise<any> {
    console.log('cookieの情報', request.headers.cookie);
    // Cookieに情報がないときは、
    if (request.headers.cookie) {
      const token = this.getCookie('Authentication', request);
      // トークン所持している場合
      if (token) {
        console.log('s: トークンを所持');
        const sessionId = this.getCookie('Session-Id', request);
        if (sessionId) {
          const userData = await this.sessionService.findOne(sessionId);
          return response.status(200).send(userData);
        }
      } else {
        const sessionId = this.getCookie('Session-Id', request);
        if (sessionId) {
          // トークンが切れているので、前回のSession-Idを破棄
          await this.sessionService.delete(sessionId);
        }
        // sessionIdがなければ、認証切れ
        return response.status(401).send();
      }
    } else {
      // sessionIdがなければ、認証切れ
      return response.status(403).send();
    }
  }

  /**
   * クッキーの値を取得
   */
  getCookie(key, request): string {
    const cookieData = request.headers.cookie !== undefined ? request.headers.cookie : '';
    const datas = cookieData.split(';').map(data => data.trim());
    const msgKeyValue = datas.find(data => data.startsWith(`${key}=`));
    if (msgKeyValue === undefined) { return ''; }
    const msgValue = msgKeyValue.replace(`${key}=`, '');
    return unescape(msgValue);
  }


}
