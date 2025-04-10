import { getCorrectAnswer } from "../main";

let comAnswer: string = "";

// 50/50 button
export const removeAnswers = (
	answerBtns: NodeListOf<HTMLButtonElement>,
	randomAnsIndex: string[]
) => {
	let removedAnswers = 0;
	let firstRemovedIndex;
	do {
		let randomIndex = Math.ceil(Math.random() * 4) - 1;
		if (
			answerBtns[randomIndex].innerText !== getCorrectAnswer() &&
			answerBtns[randomIndex].innerText !== comAnswer &&
			randomIndex !== firstRemovedIndex
		) {
			answerBtns[randomIndex].innerText = "";
			removedAnswers++;
			firstRemovedIndex = randomIndex;
			randomAnsIndex.push(answerBtns[randomIndex].innerText);
		}
	} while (removedAnswers < 2);
};

// ask COM
export const generateAnsSuggestion = (
	answerBtns: NodeListOf<HTMLButtonElement>,
	message: HTMLDivElement
) => {
	comAnswer = "";
	// generate chance of correct answer being suggested
	// 75% chance of correct ans, 25% chance of incorrect ans
	if (Math.ceil(Math.random() * 4) - 1 === 3) {
		// give incorrect ans
		const incorrectAns: string[] = [];
		answerBtns.forEach((button) => {
			if (!(button.innerText === getCorrectAnswer()) && !(button.innerText === "")) {
				incorrectAns.push(button.innerText);
			}
		});
		console.log(incorrectAns);
		comAnswer = incorrectAns[Math.ceil(Math.random() * incorrectAns.length) - 1];
	} else {
		//give correct ans
		comAnswer = getCorrectAnswer();
	}
	message.innerText = `I think the answer is ${comAnswer}`;
	message.style.display = "initial";
};
