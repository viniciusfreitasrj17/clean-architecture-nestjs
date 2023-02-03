import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BankAccountsModule } from './bank-accounts/bank-accounts.module';
import { BankAccountSchemaTypeOrm } from './@core/infra/db/bank-account.schema';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: __dirname + '/db.sqlite',
      synchronize: true,
      logging: true,
      entities: [BankAccountSchemaTypeOrm],
    }),
    BankAccountsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
