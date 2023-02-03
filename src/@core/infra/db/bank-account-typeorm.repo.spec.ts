import { BankAccountSchemaTypeOrm } from './bank-account.schema';
import { DataSource, Repository } from 'typeorm';
import { BankAccountTypeOrmRepo } from './bank-account-typeorm.repo';
import { BankAccount } from '../../domain/bank-account';

describe('BankAccountTypeOrmRepo Test', () => {
  let dataSource: DataSource;
  let ormRepo: Repository<BankAccountSchemaTypeOrm>;
  let repo: BankAccountTypeOrmRepo;

  beforeEach(async () => {
    dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      // logging: true,
      entities: [BankAccountSchemaTypeOrm],
    });

    await dataSource.initialize();
    ormRepo = dataSource.getRepository(BankAccountSchemaTypeOrm);
    repo = new BankAccountTypeOrmRepo(ormRepo);
  });

  it('should save a new bank account', async () => {
    const bankAccount = new BankAccount(100, '1234-5', '123');
    await repo.save(bankAccount);
    const model = await ormRepo.findOneBy({ account_number: '1234-5' });
    expect(model.id).toBe('123');
    expect(model.balance).toBe(100);
    expect(model.account_number).toBe('1234-5');
  });
});
