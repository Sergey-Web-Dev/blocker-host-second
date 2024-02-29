import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  AddBlockItemDto,
  BlockItemDto,
  BlockListDto,
  BlockListQueryDto,
} from './dto';
import { SessionInfo } from 'src/auth/sessionInfo.decorator';
import { GetSessionInfoDto } from 'src/auth/dto';
import { BlockListService } from './block-list.service';

@Controller('block-list')
@UseGuards(AuthGuard)
export class BlockListController {
  constructor(private blockListService: BlockListService) {}

  @Get()
  @ApiOkResponse({
    type: BlockListDto,
  })
  getList(
    @Query() query: BlockListQueryDto,
    @SessionInfo() session: GetSessionInfoDto,
  ): Promise<BlockListDto> {
    return this.blockListService.getByUser(session.id, query);
  }

  @Post()
  @ApiCreatedResponse({
    type: BlockListDto,
  })
  addBlockItem(
    @Body() body: AddBlockItemDto,
    @SessionInfo() session: GetSessionInfoDto,
  ): Promise<BlockItemDto> {
    return this.blockListService.addItem(session.id, body);
  }

  @Delete('item/:id')
  @ApiOkResponse({
    type: BlockItemDto,
  })
  async removeBlockItem(
    @Param('id', ParseIntPipe) id: number,
    @SessionInfo() session: GetSessionInfoDto,
  ): Promise<BlockItemDto> {
    return this.blockListService.removeItem(session.id, id);
  }
}
