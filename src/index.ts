#!/usr/bin/env node

import { Account } from "./Account.js";

const account = new Account();
await account.create();
await account.actions();
