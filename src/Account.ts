import { confirm, input, select } from "@inquirer/prompts";
import { AccountOwner } from "./AccountOwner.js";
import { BankAccount } from "./BankAccount.js";

export class Account {
  accountOwner!: AccountOwner;

  private async getInput(
    message: string,
    defaultValue: string,
    validate: (input: string) => boolean | string
  ) {
    return await input({
      message,
      default: defaultValue,
      validate,
    });
  }

  private validateNotEmpty(input: string) {
    return !(input.trim() === "") || "Please enter a valid input.";
  }

  private validateNumber(input: string) {
    return !isNaN(Number(input)) || "Please enter a valid number.";
  }

  async create() {
    const firstName = await this.getInput(
      "What's your first name?",
      "John",
      this.validateNotEmpty
    );
    const lastName = await this.getInput(
      "What's your last name?",
      "Doe",
      this.validateNotEmpty
    );
    const age = await this.getInput(
      "What's your age?",
      "18",
      this.validateNumber
    );
    const mobileNumber = await this.getInput(
      "What's your phone number?",
      "08012345678",
      this.validateNumber
    );

    const gender = await select({
      message: "What is your gender?",
      choices: [
        { name: "Male", value: "male" },
        { name: "Female", value: "female" },
      ],
    });

    this.accountOwner = new AccountOwner(
      firstName,
      lastName,
      gender,
      Number(age),
      Number(mobileNumber),
      new BankAccount()
    );
  }

  async back(type?: "transaction" | "information") {
    try {
      const back = await confirm({
        message:
          type === "information"
            ? "Do you want to go back?"
            : "Do you want to perform another transaction?",
      });

      if (back) {
        await this.actions();
      } else {
        process.exit();
      }
    } catch (error) {
      console.error("Error in back function:", error);
      process.exit(1);
    }
  }

  async actions() {
    try {
      const action = await select({
        message: "What do you want to do?",
        choices: [
          { name: "Withdraw money", value: "DEBIT" },
          { name: "Add money", value: "CREDIT" },
          { name: "Get account info", value: "INFO" },
          { name: "Exit", value: "EXIT" },
        ],
      });

      switch (action) {
        case "DEBIT":
          const debitAmount = await this.getInput(
            "How much do you want to debit?",
            "0",
            this.validateNumber
          );
          this.accountOwner.bankAccount.Debit(Number(debitAmount));
          await this.back();
          break;

        case "CREDIT":
          const creditAmount = await this.getInput(
            "How much do you want to credit?",
            "0",
            this.validateNumber
          );
          this.accountOwner.bankAccount.Credit(Number(creditAmount));
          await this.back();
          break;

        case "INFO":
          this.accountOwner.AccountOwnerInfo();
          await this.back("information");
          break;

        case "EXIT":
          process.exit();

        default:
          console.log("Invalid action!");
          await this.back();
          break;
      }
    } catch (error) {
      console.error("Error in actions function:", error);
      process.exit(1);
    }
  }
}
