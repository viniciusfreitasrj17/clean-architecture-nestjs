import { BankAccountSchemaTypeOrm } from '../infra/db//bank-account.schema';
import { DataSource, Repository } from 'typeorm';
import { BankAccountTypeOrmRepo } from '../infra/db/bank-account-typeorm.repo';
import { BankAccountService } from './bank-account.service';

describe('BankAccountService Test', () => {
  let dataSource: DataSource;
  let ormRepo: Repository<BankAccountSchemaTypeOrm>;
  let repo: BankAccountTypeOrmRepo;
  let bankAccountService: BankAccountService;

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
    bankAccountService = new BankAccountService(repo);
  });

  it('should create a new bank account', async () => {
    await bankAccountService.create('1234-5');
    const model = await ormRepo.findOneBy({ account_number: '1234-5' });
    expect(model.id).toBe('123');
    expect(model.balance).toBe(0);
    expect(model.account_number).toBe('1234-5');
  });
});
