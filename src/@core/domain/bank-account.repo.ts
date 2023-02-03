import { BankAccount } from './bank-account';

export interface BankAccountRepo {
  save(bankAccount: BankAccount): Promise<void>;
  update(bankAccount: BankAccount): Promise<void>;
  findByAccountNumber(account_number: string): Promise<BankAccount>;
}
