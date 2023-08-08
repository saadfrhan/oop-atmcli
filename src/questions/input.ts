import { InputConfig } from "../types.js";

export const inputQuestions: InputConfig[] = [{
	message: "What's your name?",
	default: "User",
	validate: (input: string) => {
		if (input.trim() === "") {
			return "Name cannot be empty. Please enter your name.";
		}
		return true;
	}
}]