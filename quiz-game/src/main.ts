import "./style.scss";
import * as questionData from "./question-data";

// goal -> streamline code into different files
//

// flags
let currentQuestion: number = 1; // to update and reset current question
let maxQuestion: number = 5; // to compare to current question
let userScore: number = 0; // to update and reset user's score
let isAnsBtnClicked: boolean = false; // to avoid multiple results of an answer being clicked
let isFiftyBtnClicked: boolean = false;

// capturing elements from the DOM

const questionTitle = document.querySelector<HTMLHeadingElement>("#questionTitle");
const questionText = document.querySelector<HTMLDivElement>(".question");

const answerBtns = document.querySelectorAll<HTMLButtonElement>(".answers__btn");
const answerBtnOne = document.querySelector<HTMLButtonElement>("#answer-one");
const answerBtnTwo = document.querySelector<HTMLButtonElement>("#answer-two");
const answerBtnThree = document.querySelector<HTMLButtonElement>("#answer-three");
const answerBtnFour = document.querySelector<HTMLButtonElement>("#answer-four");

const fiftyFiftyBtn = document.querySelector<HTMLButtonElement>("#btnFiftyFifty");
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
	!fiftyFiftyBtn ||
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
	const randomisedAns: string[] = randomiseAnsOrder(answers);
	// then assign each answer
	answerBtnOne.innerText = randomisedAns[0];
	answerBtnTwo.innerText = randomisedAns[1];
	answerBtnThree.innerText = randomisedAns[2];
	answerBtnFour.innerText = randomisedAns[3];
	questionTitle.innerText = `Question ${currentQuestion}`;
	// reset modifications to buttons
	ungreyAllButtons();
	// resetting defaults
	message.style.display = "none";
	nextBtn.style.display = "none";
	isAnsBtnClicked = false;
	isFiftyBtnClicked = false;
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
	fiftyFiftyBtn.style.display = "initial";
	return;
};

const displayNextQuestion = () => {
	switch (currentQuestion) {
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
			throw new Error("Question data could not be found.");
	}
};

const randomiseAnsOrder = (answers: string[]): string[] => {
	const newArray: string[] = [...answers];

	for (let i: number = 0; i < answers.length; i++) {
		// generate a random index value
		let j: number = Math.ceil(Math.random() * 4) - 1;
		// swap the value of the current index with the value of the random index
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}
	return newArray;
};

const displayResult = () => {
	questionTitle.innerText = "Result";
	answerBtns.forEach((btn) => (btn.style.display = "none"));
	message.style.display = "none";
	fiftyFiftyBtn.style.display = "none";
	nextBtn.innerText = "Play again";
	questionText.innerText = getResultMessage();
};

const getResultMessage = (): string => {
	if (userScore === 25) {
		return "Congrats! You answered all the questions correctly without any help.";
	} else if (userScore <= 24 && userScore >= 20) {
		return "Good job! You really know your stuff.";
	} else if (userScore <= 19 && userScore >= 15) {
		return "Nice! You have plenty good knowledge.";
	} else if (userScore <= 14 && userScore >= 10) {
		return "Not bad. See if you can get a higher score next time.";
	} else if (userScore <= 9 && userScore >= 5) {
		return "You know a few things. Why don't you research a few topics and try again.";
	} else {
		return "Looks like you don't know a lot about these topics. No worries! Just try again.";
	}
};

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

const greyOutButton = (greyedBtn: HTMLButtonElement) => {
	greyedBtn.style.backgroundColor = "#96a0af";
	greyedBtn.style.border = "2px solid #636883";
	greyedBtn.style.color = "#636883";
};

const ungreyAllButtons = () => {
	answerBtns.forEach((btn) => {
		ungreyAnsButton(btn);
	});
	ungreyHelpButton();
};

const ungreyAnsButton = (button: HTMLButtonElement) => {
	button.style.color = "#363732ff";
	button.style.backgroundColor = "#53d8fbff";
	button.style.border = "2px solid #66c3ffff";
};

const ungreyHelpButton = () => {
	fiftyFiftyBtn.style.backgroundColor = "#a1bbe6";
	fiftyFiftyBtn.style.border = "2px solid #3770ca";
	fiftyFiftyBtn.style.color = "#345995";
};

const correctAnswer = (button: HTMLButtonElement) => {
	//change answer button to green
	button.style.backgroundColor = "#7af0bf";
	button.style.border = "2px solid #289683";
	button.style.color = "#289683";
	//update user score
	userScore += 5;
	score.innerText = `Score: ${userScore}`;
	//display message
	message.innerText = "Correct! Great job";
};

const incorrectAnswer = (button: HTMLButtonElement) => {
	//change answer button to red
	button.style.backgroundColor = "#f4acb7ff";
	button.style.border = "2px solid #c7576f";
	button.style.color = "#c7576f";
	//display message
	message.innerText = "Better luck next time";
};

const handleAnswerButtonClick = (event: Event) => {
	const target = event.currentTarget as HTMLButtonElement;
	//check if an answer button has already been clicked
	if (isAnsBtnClicked) {
		return;
	}
	//grey out buttons
	greyOutButton(fiftyFiftyBtn);
	answerBtns.forEach((button) => greyOutButton(button));
	//check if answer for current question is correct
	if (target.innerText === getCorrectAnswer()) {
		correctAnswer(target);
	} else {
		incorrectAnswer(target);
	}
	// check if the current question is the last
	if (currentQuestion === maxQuestion) {
		nextBtn.innerText = "Show results";
	}
	message.style.display = "initial";
	nextBtn.style.display = "initial";
	isAnsBtnClicked = true;
};

const handleNextButtonClick = () => {
	if (nextBtn.innerText === "Next Question") {
		// update current question
		currentQuestion++;
		// update div display to next question
		displayNextQuestion();
	} else if (nextBtn.innerText === "Show results") {
		displayResult();
	} else {
		initialiseDisplay(questionData.question1, questionData.answers1);
	}
};

const removeAnswers = () => {
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
		}
	} while (removedAnswers < 2);
};

const handleFiftyButtonClick = () => {
	if (isAnsBtnClicked || isFiftyBtnClicked) {
		return;
	}
	removeAnswers();
	userScore -= 2;
	score.innerText = `Score: ${userScore}`;
	greyOutButton(fiftyFiftyBtn);
	isFiftyBtnClicked = true;
};

const modifyBtnOnHover = (button: HTMLButtonElement) => {
	button.style.color = "#67695f";
	button.style.backgroundColor = "#7fdbf1";
	button.style.border = "2px solid #7ccdfc";
	button.style.cursor = "pointer";
};

const modifyHelpBtnOnHover = (button: HTMLButtonElement) => {
	button.style.color = "#5a7eb8";
	button.style.backgroundColor = "#bccfec";
	button.style.border = "2px solid #6aa7e0";
	button.style.cursor = "pointer";
};

const handleAnswerButtonMouseOn = (event: Event) => {
	const target = event.currentTarget as HTMLButtonElement;
	if (isAnsBtnClicked || target.innerText === "") {
		target.style.cursor = "default";
		return;
	}
	modifyBtnOnHover(target);
};

const handleNextButtonMouseOn = () => {
	modifyBtnOnHover(nextBtn);
};

const handleFiftyButtonMouseOn = () => {
	if (isAnsBtnClicked || isFiftyBtnClicked) {
		fiftyFiftyBtn.style.cursor = "default";
		return;
	}
	modifyHelpBtnOnHover(fiftyFiftyBtn);
};

const handleAnswerButtonMouseOff = (event: Event) => {
	const target = event.currentTarget as HTMLButtonElement;
	if (isAnsBtnClicked || target.innerText === "") {
		return;
	}
	ungreyAnsButton(target);
};

const handleNextButtonMouseOff = () => {
	ungreyAnsButton(nextBtn);
};

const handleFiftyButtonMouseOff = () => {
	if (isAnsBtnClicked || isFiftyBtnClicked) {
		return;
	}
	ungreyHelpButton();
};

initialiseDisplay(questionData.question1, questionData.answers1);

answerBtns.forEach((button) => button.addEventListener("click", handleAnswerButtonClick));
nextBtn.addEventListener("click", handleNextButtonClick);
fiftyFiftyBtn.addEventListener("click", handleFiftyButtonClick);

answerBtns.forEach((button) => button.addEventListener("mouseover", handleAnswerButtonMouseOn));
nextBtn.addEventListener("mouseover", handleNextButtonMouseOn);
fiftyFiftyBtn.addEventListener("mouseover", handleFiftyButtonMouseOn);

answerBtns.forEach((button) => button.addEventListener("mouseleave", handleAnswerButtonMouseOff));
nextBtn.addEventListener("mouseleave", handleNextButtonMouseOff);
fiftyFiftyBtn.addEventListener("mouseleave", handleFiftyButtonMouseOff);
