import "./style.scss";

import * as questionData from "./question-data";

// capturing elements from the DOM

const question = document.querySelector<HTMLDivElement>(".question");
const answerBtns = document.querySelectorAll<HTMLButtonElement>(".answers__btn");
const score = document.querySelector<HTMLDivElement>("#score");
const nextOrAgainBtn = document.querySelector<HTMLButtonElement>("#nextOrAgain");
const message = document.querySelector<HTMLDivElement>("#message");

if (!question || !answerBtns || !score || !nextOrAgainBtn || !message) {
	throw new Error("Some elements cannot be found.");
}

// initialise display to show Question 1

const initialiseDisplay = (question: string, answers: string[]) => {
	return;
};
