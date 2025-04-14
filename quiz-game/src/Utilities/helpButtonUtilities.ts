import { getCorrectAnswer } from "../main";

let comAnswer: string = "";

// 50/50 button
export const removeAnswers = (
	answerBtns: NodeListOf<HTMLButtonElement>,
	randomAnsIndex: string[]
) => {
	let removedAnswers = 0;
	let firstRemovedIndex;
	randomAnsIndex = [];
	do {
		let randomIndex = getRandomValue(4);
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
	if (getRandomValue(4) === 3) {
		// give incorrect ans
		const incorrectAns: string[] = [];
		answerBtns.forEach((button) => {
			if (!(button.innerText === getCorrectAnswer()) && !(button.innerText === "")) {
				incorrectAns.push(button.innerText);
			}
		});
		console.log(incorrectAns);
		comAnswer = incorrectAns[getRandomValue(incorrectAns.length)];
	} else {
		//give correct ans
		comAnswer = getCorrectAnswer();
	}
	message.innerText = `I think the answer is ${comAnswer}`;
	message.style.display = "initial";
};

// generate a value between 0 and (maxValue - 1)
const getRandomValue = (maxValue: number): number => {
	return Math.ceil(Math.random() * maxValue) - 1;
};
