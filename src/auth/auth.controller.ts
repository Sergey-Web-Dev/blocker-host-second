import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { SignInBodyDto, SignUpBodyDto, GetSessionInfoDto } from './dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CookieService } from './cookie.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
  ) {}

  @Post('sign-up')
  @ApiCreatedResponse()
  async signUp(
    @Body() body: SignUpBodyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.signUp(
      body.email,
      body.password,
    );

    this.cookieService.setToken(res, accessToken);
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  signIn(@Body() body: SignInBodyDto) {
    return null;
  }

  @Post('sign-out')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  signOut() {}

  @Get('session-info')
  @ApiOkResponse({
    type: GetSessionInfoDto,
  })
  getSessionInfo() {
    return null;
  }
}
