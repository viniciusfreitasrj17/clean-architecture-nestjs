import { BankAccount } from './bank-account';

describe('Bank Account Test Unit', () => {
  it('should create a bank account', () => {
    const bankAccount = new BankAccount(100, '15462-5', '1');
    expect(bankAccount).toBeInstanceOf(BankAccount);
    expect(bankAccount.id).toBe('1');
    expect(bankAccount.balance).toBe(100);
    expect(bankAccount.account_number).toBe('15462-5');
  });

  it('should debit an account', () => {
    const bankAccount = new BankAccount(100, '15462-5', '1');
    bankAccount.debit(50);
    expect(bankAccount.balance).toBe(50);
  });

  it('should credit an account', () => {
    const bankAccount = new BankAccount(100, '15462-5', '1');
    bankAccount.credit(50);
    expect(bankAccount.balance).toBe(150);
  });
});
