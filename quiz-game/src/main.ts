import "./style.scss";

import * as questionData from "./question-data";

// flags

let isNewGame: boolean = true;

// capturing elements from the DOM

const questionText = document.querySelector<HTMLDivElement>(".question");

const answerBtns = document.querySelectorAll<HTMLButtonElement>(".answers__btn");
const answerBtnOne = document.querySelector<HTMLButtonElement>("#answer-one");
const answerBtnTwo = document.querySelector<HTMLButtonElement>("#answer-two");
const answerBtnThree = document.querySelector<HTMLButtonElement>("#answer-three");
const answerBtnFour = document.querySelector<HTMLButtonElement>("#answer-four");

const score = document.querySelector<HTMLDivElement>("#score");
const nextOrAgainBtn = document.querySelector<HTMLButtonElement>("#nextOrAgain");
const message = document.querySelector<HTMLDivElement>("#message");

if (
	!questionText ||
	!answerBtns ||
	!answerBtnOne ||
	!answerBtnTwo ||
	!answerBtnThree ||
	!answerBtnFour ||
	!score ||
	!nextOrAgainBtn ||
	!message
) {
	throw new Error("Some elements cannot be found.");
}

// initialise display to show Question 1
const initialiseDisplay = (question1: string, answers1: string[]) => {
	questionText.innerText = question1;
	// randomise the order of the array
	const randomisedAns: string[] = ansOrderRandomise(answers1);
	// then assign each answer
	answerBtnOne.innerText = randomisedAns[0];
	answerBtnTwo.innerText = randomisedAns[1];
	answerBtnThree.innerText = randomisedAns[2];
	answerBtnFour.innerText = randomisedAns[3];

	return;
};

// randomise answer order
const ansOrderRandomise = (answers: string[]): string[] => {
	const newArray: string[] = [...answers];

	for (let i: number = 0; i < answers.length; i++) {
		// generate a random index value
		let j: number = Math.floor(Math.random() * (answers.length - 1));
		// swap the value of the current index with the value of the random index
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}
	return newArray;
};

if (isNewGame) {
	initialiseDisplay(questionData.question1, questionData.answers1);
	isNewGame = false;
}
