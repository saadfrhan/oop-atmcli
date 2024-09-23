import { BankAccount } from "./BankAccount.js";

export class AccountOwner {
  constructor(
    private _firstName: string,
    private _lastName: string,
    private _gender: string,
    private _age: number,
    private _mobileNumber: number,
    private _bankAccount: BankAccount
  ) {}

  get firstName() {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName() {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get gender() {
    return this._gender;
  }

  set gender(value: string) {
    this._gender = value;
  }

  get age() {
    return this._age;
  }

  set age(value: number) {
    this._age = value;
  }

  get mobileNumber() {
    return this._mobileNumber;
  }

  set mobileNumber(value: number) {
    this._mobileNumber = value;
  }

  get bankAccount() {
    return this._bankAccount;
  }

  set bankAccount(value: BankAccount) {
    this._bankAccount = value;
  }

  AccountOwnerInfo() {
    console.log(`Name: ${this.firstName} ${this.lastName}`);
    console.log(`Age: ${this.age}`);
    console.log(`Gender: ${this.gender}`);
    console.log(`Mobile: ${this.mobileNumber}`);
    console.log(`Account balance: ${this.bankAccount.balance}`);
  }
}