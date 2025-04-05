import "./style.scss";
import * as questionData from "./question-data";

// flags

let currentQuestion: number = 1; // to update and reset current question
let maxQuestion: number = 5; // to compare to current question
let userScore: number = 0; // to update and reset user's score
let isAnsBtnClicked: boolean = false; // to avoid multiple results of an answer being clicked

// capturing elements from the DOM

const questionTitle = document.querySelector<HTMLHeadingElement>("#questionTitle");
const questionText = document.querySelector<HTMLDivElement>(".question");

const answerBtns = document.querySelectorAll<HTMLButtonElement>(".answers__btn");
const answerBtnOne = document.querySelector<HTMLButtonElement>("#answer-one");
const answerBtnTwo = document.querySelector<HTMLButtonElement>("#answer-two");
const answerBtnThree = document.querySelector<HTMLButtonElement>("#answer-three");
const answerBtnFour = document.querySelector<HTMLButtonElement>("#answer-four");

const score = document.querySelector<HTMLDivElement>("#score");
const message = document.querySelector<HTMLDivElement>("#message");
const nextBtn = document.querySelector<HTMLButtonElement>("#nextBtn");

if (
	!questionTitle ||
	!questionText ||
	!answerBtns ||
	!answerBtnOne ||
	!answerBtnTwo ||
	!answerBtnThree ||
	!answerBtnFour ||
	!score ||
	!nextBtn ||
	!message
) {
	throw new Error("Some elements cannot be found.");
}

// update display to current question
const updateDisplay = (question: string, answers: string[]) => {
	questionText.innerText = question;
	// randomise the order of the array
	const randomisedAns: string[] = ansOrderRandomise(answers);
	// then assign each answer
	answerBtnOne.innerText = randomisedAns[0];
	answerBtnTwo.innerText = randomisedAns[1];
	answerBtnThree.innerText = randomisedAns[2];
	answerBtnFour.innerText = randomisedAns[3];
	questionTitle.innerText = `Question ${currentQuestion}`;
	// reset modifications to buttons
	answerBtns.forEach((btn) => {
		btn.style.backgroundColor = "#53d8fbff";
		btn.style.border = "2px solid #66c3ffff";
	});
	// resetting defaults of message, next button and if answer button has been clicked
	message.style.display = "none";
	nextBtn.style.display = "none";
	isAnsBtnClicked = false;
};

// initialise display to show Question 1
const initialiseDisplay = (question1: string, answers1: string[]) => {
	updateDisplay(question1, answers1);
	// reset defaults
	userScore = 0;
	score.innerText = `Score: ${userScore}`;
	currentQuestion = 1;
	questionTitle.innerText = `Question ${currentQuestion}`;
	nextBtn.innerText = "Next Question";
	answerBtns.forEach((btn) => (btn.style.display = "initial"));
	return;
};

const displayNextQuestion = (questionNum: number) => {
	switch (questionNum) {
		case 2:
			updateDisplay(questionData.question2, questionData.answers2);
			break;
		case 3:
			updateDisplay(questionData.question3, questionData.answers3);
			break;
		case 4:
			updateDisplay(questionData.question4, questionData.answers4);
			break;
		case 5:
			updateDisplay(questionData.question5, questionData.answers5);
			break;
		default:
			//end quiz
			break;
	}
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

const displayResult = () => {
	questionTitle.innerText = "Result";
	answerBtns.forEach((btn) => (btn.style.display = "none"));
	message.style.display = "none";
	nextBtn.innerText = "Play again";
	// message depending on score
	if (userScore === 25) {
		questionText.innerText = "Congrats! You answered all the questions correctly.";
	} else if (userScore === 20) {
		questionText.innerText = "Goob job! You answered most questions correctly.";
	} else if (userScore === 15) {
		questionText.innerText = "Nice! You answered some questions correctly.";
	} else if (userScore === 10) {
		questionText.innerText = "Not bad. You answered a few questions correctly.";
	} else if (userScore === 5) {
		questionText.innerText = "You answered one question correctly. Why don't you try again?";
	} else {
		questionText.innerText =
			"Looks like you don't know a lot about these topics. No worries! Just try again.";
	}
};

// compares chosen answer to correct answer
const checkCorrectAnswer = (answer: string, correctAns: string): boolean => {
	if (answer === correctAns) {
		return true;
	} else {
		return false;
	}
};

// grabs correct answer
const getCorrectAnswer = (): string => {
	switch (currentQuestion) {
		case 1:
			return questionData.answers1[0];
		case 2:
			return questionData.answers2[0];
		case 3:
			return questionData.answers3[0];
		case 4:
			return questionData.answers4[0];
		case 5:
			return questionData.answers5[0];
		default:
			throw new Error("Correct answer cannot be found.");
	}
};

const handleAnswerButtonClick = (event: Event) => {
	const target = event.currentTarget as HTMLButtonElement;
	//check if an answer button has already been clicked
	if (isAnsBtnClicked) {
		return;
	}

	//check if answer for current question is correct
	let isQuestionCorrect = false;
	isQuestionCorrect = checkCorrectAnswer(target.innerText, getCorrectAnswer());

	if (isQuestionCorrect) {
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

	// check if the current question is the last
	if (currentQuestion === maxQuestion) {
		nextBtn.innerText = "Show results";
	}

	nextBtn.style.display = "initial";
	isAnsBtnClicked = true;
};

const handleNextButtonClick = () => {
	if (nextBtn.innerText === "Next Question") {
		// update current question
		currentQuestion++;
		// update div display to next question
		displayNextQuestion(currentQuestion);
	} else if (nextBtn.innerText === "Show results") {
		displayResult();
	} else {
		initialiseDisplay(questionData.question1, questionData.answers1);
	}
};

initialiseDisplay(questionData.question1, questionData.answers1);

answerBtns.forEach((button) => button.addEventListener("click", handleAnswerButtonClick));
nextBtn.addEventListener("click", handleNextButtonClick);
