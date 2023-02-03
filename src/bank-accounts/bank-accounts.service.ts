import { Inject, Injectable } from '@nestjs/common';
import { getDataSourceToken, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { BankAccountSchemaTypeOrm } from '../@core/infra/db/bank-account.schema';

@Injectable()
export class BankAccountsService {
  constructor(
    @InjectRepository(BankAccountSchemaTypeOrm)
    private repo: Repository<BankAccountSchemaTypeOrm>,
    @Inject(getDataSourceToken())
    private dataSource: DataSource,
  ) {}

  async create(createBankAccountDto: CreateBankAccountDto) {
    const { account_number } = createBankAccountDto;
    const bankAccount = this.repo.create({
      account_number,
      balance: 0,
    });

    await this.repo.insert(bankAccount);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  async transfer(from: string, to: string, amount: number) {
    // transation mode
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.startTransaction();
      const fromAccount = await this.repo.findOneBy({ account_number: from });
      const toAccount = await this.repo.findOneBy({ account_number: to });

      fromAccount.balance -= amount;
      toAccount.balance += amount;

      this.repo.save(fromAccount);
      this.repo.save(toAccount);
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      console.log(e);
      throw e;
    }
  }
}
