import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { AccountDto, PatchAccountDto } from './dto';
import { SessionInfo } from 'src/auth/sessionInfo.decorator';
import { GetSessionInfoDto } from 'src/auth/dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('account')
@UseGuards(AuthGuard)
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get()
  @ApiOkResponse({
    type: AccountDto,
  })
  async getAccount(
    @SessionInfo() session: GetSessionInfoDto,
  ): Promise<AccountDto> {
    return await this.accountService.getAccount(session.id);
  }

  @Patch()
  @ApiOkResponse({
    type: AccountDto,
  })
  async patchAccount(
    @Body() body: PatchAccountDto,
    @SessionInfo() session: GetSessionInfoDto,
  ): Promise<AccountDto> {
    return await this.accountService.patchAccount(session.id, body);
  }
}
