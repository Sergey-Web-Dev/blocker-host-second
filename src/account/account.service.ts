import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { PatchAccountDto } from './dto';

@Injectable()
export class AccountService {
  constructor(private db: DbService) {}

  async create(ownerId: number) {
    return await this.db.account.create({
      data: {
        ownerId,
        isBlockingEnabled: false,
      },
    });
  }

  async getAccount(ownerId: number) {
    return await this.db.account.findFirstOrThrow({ where: { ownerId } });
  }

  async patchAccount(ownerId: number, patch: PatchAccountDto) {
    return await this.db.account.update({
      where: { ownerId },
      data: { ...patch },
    });
  }
}
