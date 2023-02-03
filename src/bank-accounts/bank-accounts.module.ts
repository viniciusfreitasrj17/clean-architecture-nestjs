import { Module } from '@nestjs/common';
import { BankAccountsService } from './bank-accounts.service';
import { BankAccountsController } from './bank-accounts.controller';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { BankAccountSchemaTypeOrm } from '../@core/infra/db/bank-account.schema';
import { BankAccountTypeOrmRepo } from '../@core/infra/db/bank-account-typeorm.repo';
import { BankAccountService } from '../@core/app/bank-account.service';
import { DataSource } from 'typeorm';
import { BankAccountRepo } from 'src/@core/domain/bank-account.repo';

@Module({
  imports: [TypeOrmModule.forFeature([BankAccountSchemaTypeOrm])],
  controllers: [BankAccountsController],
  providers: [
    BankAccountsService,
    {
      provide: BankAccountTypeOrmRepo,
      useFactory: (dataSource: DataSource) => {
        return new BankAccountTypeOrmRepo(
          dataSource.getRepository(BankAccountSchemaTypeOrm),
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: BankAccountService,
      useFactory: (repo: BankAccountRepo) => new BankAccountService(repo),
      inject: [BankAccountTypeOrmRepo],
    },
  ],
})
export class BankAccountsModule {}
