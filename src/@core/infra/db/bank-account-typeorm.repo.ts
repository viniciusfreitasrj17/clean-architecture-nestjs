import { BankAccount } from 'src/@core/domain/bank-account';
import { BankAccountRepo } from 'src/@core/domain/bank-account.repo';
import { BankAccountSchemaTypeOrm } from './bank-account.schema';
import { Repository } from 'typeorm';

export class BankAccountTypeOrmRepo implements BankAccountRepo {
  constructor(private ormRepo: Repository<BankAccountSchemaTypeOrm>) {}
  async save(bankAccount: BankAccount): Promise<void> {
    const model = this.ormRepo.create(bankAccount);
    await this.ormRepo.insert(model);
  }

  async update(bankAccount: BankAccount): Promise<void> {
    await this.ormRepo.update(bankAccount.id, {
      balance: bankAccount.balance,
    });
  }

  async findByAccountNumber(account_number: string): Promise<BankAccount> {
    const model = await this.ormRepo.findOneBy({ account_number });
    return new BankAccount(model.balance, model.account_number, model.id);
  }
}
