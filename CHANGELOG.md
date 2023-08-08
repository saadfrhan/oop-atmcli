# nodejs-typescript-cli-template

## 0.1.0

### Minor Changes

- [`4a1ec0e`](https://github.com/saadfrhan/bank-cli/commit/4a1ec0e9f76b45e93969cc07c9e195b4bf3bae4f) Thanks [@saadfrhan](https://github.com/saadfrhan)! - - User will be prompted to enter his personal details.

  - An Account instance will be created with 100 value as balance.
  - Then a select prompt will appear that will ask if he either wants to

  1. withdraw money,
  1. add money,
  1. get account info,
  1. or exit the CLI.

  - In debitting, there will be errors in following cases:

  1. debit amount is negative.
  1. debit amount is greater than actual balance.

  - In creditting, there will be errors in following cases:

  1. credit amount is negative.

  - If the user adds money more than 100, 1 value will be deducted from his account.

  - every options except the Exit, the user gets ask whether he want to go back.
