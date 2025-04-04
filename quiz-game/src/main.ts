import "./style.scss";

import * as questionData from "./question-data";

// flags

let isNewGame: boolean = true; // to start a new game
let currentQuestion: number = 1; // to update and reset current question
let userScore: number = 0; // to update and reset user's score
let isAnsBtnClicked: boolean = false; // to avoid multiple results of an answer being clicked

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
	// reset defaults
	score.innerText = `Score: ${userScore}`;
	isAnsBtnClicked = false;
	message.style.display = "none";
	nextOrAgainBtn.style.display = "none";

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

const handleAnswerButtonClick = (event: Event) => {
	const target = event.currentTarget as HTMLButtonElement;

	//check if an answer button has already been clicked
	if (isAnsBtnClicked) {
		return;
	}

	// currently all placeholders for question 1. seperate functions to be made for each question check

	// check if the answer is correct
	if (target.innerText === "Tokyo") {
		//change answer button to green
		target.style.backgroundColor = "#7af0bf";
		target.style.border = "2px solid #45beaa";
		//update user score
		userScore += 5;
		score.innerText = `Score: ${userScore}`;
		//display message
		message.style.display = "initial";
		message.innerText = "Correct! Great job";
	} else {
		//change answer button to red
		target.style.backgroundColor = "#f4acb7ff";
		target.style.border = "2px solid #c7576f";
		//display message
		message.style.display = "initial";
		message.innerText = "Better luck next time";
	}
	//display next question button
	nextOrAgainBtn.style.display = "initial";

	isAnsBtnClicked = true;
};

const handleNextButtonClick = (event: Event) => {};

if (isNewGame) {
	initialiseDisplay(questionData.question1, questionData.answers1);
	isNewGame = false;
}

answerBtns.forEach((button) => button.addEventListener("click", handleAnswerButtonClick));
nextOrAgainBtn.addEventListener("click", handleNextButtonClick);
