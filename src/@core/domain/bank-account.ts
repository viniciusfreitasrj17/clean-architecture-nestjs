export class BankAccount {
  id: string;
  balance: number;
  account_number: string;

  constructor(balance: number, account_number: string, id?: string) {
    this.id = id ?? String(Math.ceil(Math.random() * 10 ** 15));
    this.balance = balance;
    this.account_number = account_number;
  }

  debit(amount: number) {
    if (this.balance - amount < 0) {
      throw new Error('Insufficient balance');
    }

    this.balance -= amount;
  }

  credit(amount: number) {
    this.balance += amount;
  }
}
