export class BankAccount {
    private _balance: number;
  
    constructor() {
      this._balance = 100;
    }
  
    get balance() {
      return this._balance;
    }
  
    set balance(value: number) {
      this._balance = value;
    }
  
    Debit(amount: number) {
      let statement = "0 means you don't want to debit your account.";
  
      if (amount > 0) {
        statement = "The amount you entered is wrong.";
        if (this.balance > amount) {
          this.balance = this.balance - amount;
          statement = `Transaction successful! New account balance is ${this.balance}`;
        } else {
          statement = "You don't enough money to do this transaction.";
        }
      }
  
      console.log(statement);
    }
  
    Credit(amount: number) {
      let statement = "0 means you don't want to credit your account.";
  
      if (amount > 0) {
        this.balance = this.balance + amount;
  
        if (amount > 100) {
          this.balance = this.balance - 1;
        }
  
        statement = "Your account has been credited successfully!";
      }
  
      console.log(statement);
    }
  }