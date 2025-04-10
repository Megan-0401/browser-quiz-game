import { getCorrectAnswer } from "../main";

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
			randomIndex !== firstRemovedIndex
		) {
			answerBtns[randomIndex].innerText = "";
			removedAnswers++;
			firstRemovedIndex = randomIndex;
			randomAnsIndex.push(answerBtns[randomIndex].innerText);
		}
	} while (removedAnswers < 2);
};
