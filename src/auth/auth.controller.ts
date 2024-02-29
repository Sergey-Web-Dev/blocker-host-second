import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  SignInBodyDto,
  SignUpBodyDto,
  GetSessionInfoDto,
  DeleteUserBodyDto,
} from './dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CookieService } from './cookie.service';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { SessionInfo } from './sessionInfo.decorator';

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

  @Delete('delete-user')
  @ApiOkResponse()
  async deleteUser(
    @Body() body: DeleteUserBodyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.deleteUser(body.email);
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  async signIn(
    @Body() body: SignInBodyDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.signIn(
      body.email,
      body.password,
    );

    this.cookieService.setToken(res, accessToken);
  }

  @Post('sign-out')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @UseGuards(AuthGuard)
  signOut(@Res({ passthrough: true }) res: Response) {
    this.cookieService.removeToken(res);
  }

  @Get('session-info')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    type: GetSessionInfoDto,
  })
  getSessionInfo(@SessionInfo() session: GetSessionInfoDto) {
    return session;
  }
}
