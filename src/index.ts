#!/usr/bin/env node

import { input } from "@inquirer/prompts";
import { beautifyName } from "./utils/beautifyName.js";
import { inputQuestions } from "./questions/input.js";

const name = await input(inputQuestions[0]);

console.log(`Hello, ${beautifyName(name)}!`);

process.exit();

