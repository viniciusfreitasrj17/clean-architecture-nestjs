import { BankAccount } from './bank-account';

export class TransferService {
  async transfer(
    bankAccountSrc: BankAccount,
    bankAccountDist: BankAccount,
    amount: number,
  ) {
    bankAccountSrc.debit(amount);
    bankAccountDist.credit(amount);
  }
}
