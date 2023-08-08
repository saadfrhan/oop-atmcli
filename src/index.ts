#!/usr/bin/env node

import { confirm, input, select } from "@inquirer/prompts";

class BankAccount {
	private _balance: number;

	constructor() {
		this._balance = 100;
	}

	get balance() {
		return this._balance;
	}

	set balance(theBalance: number) {
		this._balance = theBalance;
	}

	Debit(amount: number) {
		let statement = "0 means you don't want to debit your account.";

		if (amount > 0) {
			statement = "The amount you entered is wrong.";
			if (this.balance > amount) {
				this.balance = this.balance - amount;
				statement = `Transaction successful! New account balance is ${this.balance}`;
			} else {
				statement = "You don't enough money to do this transaction."
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

class AccountOwner {
	private _firstName!: string;
	private _lastName!: string;
	private _gender!: string;
	private _age!: number;
	private _mobileNumber!: number;
	private _bankAccount!: BankAccount;

	set firstName(theFirstName: string) {
		this._firstName = theFirstName;
	}

	get firstName() {
		return this._firstName;
	}

	set lastName(theLastName: string) {
		this._lastName = theLastName;
	}

	get lastName() {
		return this._lastName;
	}

	set gender(theGender: string) {
		this._gender = theGender;
	}

	get gender() {
		return this._gender;
	}

	set age(theAge: number) {
		this._age = theAge;
	}

	get age() {
		return this._age;
	}

	set mobileNumber(theMobileNumber: number) {
		this._mobileNumber = theMobileNumber;
	}

	get mobileNumber() {
		return this._mobileNumber;
	}

	set bankAccount(theBankAccount: BankAccount) {
		this._bankAccount = theBankAccount;
	}

	get bankAccount() {
		return this._bankAccount;
	}

	AccountOwnerInfo() {
		console.log(`Name ${this.firstName} ${this.lastName}`);
		console.log(`Age: ${this.age}`)
		console.log(`Gender: ${this.gender}`);
		console.log(`Mobile: ${this.mobileNumber}`);
		console.log(`Account balance: ${this.bankAccount.balance}`)
	}
}

class Account {
	accountOwner!: AccountOwner;

	async create() {
			const firstName = await input({
				message: "What's your first name?",
				default: "John",
				validate: (input: string) => !(input.trim() === "") || "Please enter your first name.",
			});
			const lastName = await input({
				message: "What's your last name?",
				default: "Doe",
				validate: (input: string) => !(input.trim() === "") || "Please enter your last name.",
			});
	
			const age = await input({
				message: "What's your age?",
				default: "18",
				validate: (input: string) => !isNaN(Number(input)) || "Please enter a valid age.",
			});
			const mobileNumber = await input({
				message: "What's your phone number?",
				default: "08012345678",
				validate: (input: string) => !isNaN(Number(input)) || "Please enter a valid phone number.",
			});
			const gender = await select({
				message: "What is your gender?",
				choices: [
					{ name: "Male", value: "male" },
					{ name: "Female", value: "female" }
				]
			});
	
			this.accountOwner = new AccountOwner();
			this.accountOwner.firstName = firstName;
			this.accountOwner.lastName = lastName;
			this.accountOwner.age = Number(age);
			this.accountOwner.mobileNumber = Number(mobileNumber);
			this.accountOwner.gender = gender;
			this.accountOwner.bankAccount = new BankAccount();
	}

	async back(type?: "transaction" | "information") {
		const back = await confirm({
			message : type === "information" ? "Do you want to go back?" : "Do you want to perform another transaction?",
		});

		if (back) {
			await this.actions();
		}

		process.exit();
	}

	async actions() {

		const action = await select({
			message: "What do you want to do?",
			choices: [
				{ name: "Withdraw money", value: "DEBIT" },
				{ name: "Add money", value: "CREDIT" },
				{ name: "Get account info", value: "INFO" },
				{name: "Exit", value: "EXIT"}
			]
		});
		
		switch (action) {
			case "DEBIT":
				const debitAmount = await input({
					message: "How much do you want to debit?",
					default: "0",
					validate: (input: string) => !isNaN(Number(input)) || "Please enter a valid amount.",
				});
				this.accountOwner.bankAccount.Debit(Number(debitAmount));
				this.back();
				break;

			case "CREDIT":
				const creditAmount = await input({
					message: "How much do you want to credit?",
					default: "0",
					validate: (input: string) => !isNaN(Number(input)) || "Please enter a valid amount.",
				});
				this.accountOwner.bankAccount.Credit(Number(creditAmount));
				this.back();
				break;
	
			case "INFO":
				this.accountOwner.AccountOwnerInfo();
				this.back("information");
				break;

			case "EXIT":
				process.exit();
	
			default:
				console.log("Invalid action!");
				this.back();
				break;
		}
	}

}

const account = new Account();
await account.create();
await account.actions();