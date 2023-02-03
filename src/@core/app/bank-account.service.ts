import { BankAccount } from '../domain/bank-account';
import { BankAccountRepo } from '../domain/bank-account.repo';
import { TransferService } from '../domain/transfer.service';

export class BankAccountService {
  constructor(private bankAccountRepo: BankAccountRepo) {}

  // usecase create
  async create(account_number: string) {
    const bankAccount = new BankAccount(0, account_number);
    await this.bankAccountRepo.save(bankAccount);
    return bankAccount;
  }

  // usecase transfer
  async transfer(
    account_number_src: string,
    account_number_dist: string,
    amount: number,
  ) {
    const bankAccountSrc = await this.bankAccountRepo.findByAccountNumber(
      account_number_src,
    );
    const bankAccountDist = await this.bankAccountRepo.findByAccountNumber(
      account_number_dist,
    );

    const transferService = new TransferService();
    transferService.transfer(bankAccountSrc, bankAccountDist, amount);

    await this.bankAccountRepo.update(bankAccountSrc);
    await this.bankAccountRepo.update(bankAccountDist);
  }
}
