import "./style.scss";
import { Questions } from "./questionData";
import {
	greyOutButton,
	modifyBtnOnHover,
	modifyHelpBtnOnHover,
	ungreyAllAnsButtons,
	ungreyAllButtons,
	ungreyAnsButton,
	ungreyHelpButton,
} from "./Utilities/buttonDisplay";
import {
	randomiseAnsOrder,
	correctAnswer,
	incorrectAnswer,
} from "./Utilities/answerButtonUtilities";
import { removeAnswers, generateAnsSuggestion } from "./Utilities/helpButtonUtilities";

// flags
let currentQuestion: number = 1; // to update and reset current question
let maxQuestion: number = Questions.length; // to compare to current question
let userScore: number = 0; // to update and reset user's score
let isAnsBtnClicked: boolean = false; // to avoid multiple results of an answer being clicked
let isFiftyBtnClicked: boolean = false;
let isAskComBtnClicked: boolean = false;
let isMusicMuted: boolean = false;
export let removedAnswers: string[] = []; // records the removed answers to prevent them from being clicked on

// capturing elements from the DOM
const questionTitle = document.querySelector<HTMLHeadingElement>("#questionTitle");
const questionText = document.querySelector<HTMLDivElement>(".question");

const answerBtns = document.querySelectorAll<HTMLButtonElement>(".answers__btn");

const helpBtns = document.querySelectorAll<HTMLButtonElement>(".help__btn");
const fiftyFiftyBtn = document.querySelector<HTMLButtonElement>("#btnFiftyFifty");
const askComBtn = document.querySelector<HTMLButtonElement>("#btnAskCom");

const score = document.querySelector<HTMLDivElement>("#score");
const message = document.querySelector<HTMLDivElement>("#message");
const nextBtn = document.querySelector<HTMLButtonElement>("#nextBtn");

const menuScreen = document.querySelector<HTMLDivElement>("#menuScreen");
const startBtn = document.querySelector<HTMLButtonElement>("#startBtn");
const quizDisplay = document.querySelector<HTMLElement>(".whole-display");

const sfxCorrect = document.querySelector<HTMLAudioElement>("#sfxCorrect");
const sfxIncorrect = document.querySelector<HTMLAudioElement>("#sfxIncorrect");
const bgMusic = document.querySelector<HTMLAudioElement>("#music");
const muteMusicBtn = document.querySelector<HTMLButtonElement>("#muteMusic");

if (
	!questionTitle ||
	!questionText ||
	!answerBtns ||
	!helpBtns ||
	!fiftyFiftyBtn ||
	!askComBtn ||
	!score ||
	!nextBtn ||
	!message ||
	!menuScreen ||
	!startBtn ||
	!quizDisplay ||
	!sfxCorrect ||
	!sfxIncorrect ||
	!bgMusic ||
	!muteMusicBtn
) {
	throw new Error("Some elements cannot be found.");
}

// update display to current question
const updateDisplay = (question: string, answers: string[]) => {
	questionTitle.innerText = `Question ${currentQuestion}`;
	questionText.innerHTML = question;
	// randomise the order of the array
	const randomisedAns: string[] = randomiseAnsOrder(answers);
	// then assign each answer
	answerBtns[0].innerText = randomisedAns[0];
	answerBtns[1].innerText = randomisedAns[1];
	answerBtns[2].innerText = randomisedAns[2];
	answerBtns[3].innerText = randomisedAns[3];
	// reset modifications to active buttons
	ungreyAllAnsButtons(answerBtns);
	if (!isFiftyBtnClicked) {
		ungreyHelpButton(fiftyFiftyBtn);
	}
	if (!isAskComBtnClicked) {
		ungreyHelpButton(askComBtn);
	}
	// resetting defaults
	message.style.display = "none";
	nextBtn.style.display = "none";
	isAnsBtnClicked = false;
};

// initialise display to show Question 1
const initialiseDisplay = (question1: string, answers1: string[]) => {
	menuScreen.style.display = "none";
	quizDisplay.style.display = "flex";
	currentQuestion = Questions[0].questionId;
	updateDisplay(question1, answers1);
	//all buttons should become active again
	ungreyAllButtons(answerBtns, helpBtns);
	isFiftyBtnClicked = false;
	isAskComBtnClicked = false;
	// reset defaults
	userScore = 0;
	score.innerText = `Score: ${userScore}`;
	nextBtn.innerText = "Next Question";
	answerBtns.forEach((btn) => (btn.style.display = "initial"));
	helpBtns.forEach((btn) => (btn.style.display = "initial"));
	return;
};

const displayMenu = () => {
	menuScreen.style.display = "flex";
	quizDisplay.style.display = "none";
	playMusic();
};

const playMusic = () => {
	bgMusic.play();
	bgMusic.volume = 0.3;
	bgMusic.loop = true;
};

const muteMusic = () => {
	bgMusic.pause();
};

const displayNextQuestion = () => {
	const question: string = Questions[currentQuestion - 1].question;
	const answers: string[] = Questions[currentQuestion - 1].answers;
	updateDisplay(question, answers);
};

const displayResult = () => {
	questionTitle.innerText = "Result";
	answerBtns.forEach((btn) => (btn.style.display = "none"));
	message.style.display = "none";
	helpBtns.forEach((btn) => (btn.style.display = "none"));
	nextBtn.innerText = "Play again";
	questionText.innerText = getResultMessage();
};

const getResultMessage = (): string => {
	// 4 outcomes -> all correct, half correct, some correct, none correct
	let maxScore = maxQuestion * 5;
	let halfMaxScore = (maxQuestion / 2) * 5;
	if (userScore === maxScore) {
		return "Congrats! You answered all the questions correctly.";
	} else if (userScore < maxScore && userScore > halfMaxScore) {
		return "Good job! You really know your stuff.";
	} else if (userScore <= halfMaxScore && userScore >= 5) {
		return "Not bad. See if you can get a higher score next time.";
	} else {
		return "Looks like you don't know a lot about these topics. No worries! Just try again.";
	}
};

export const getCorrectAnswer = (): string => {
	return Questions[currentQuestion - 1].answers[0];
};

const handleStartButtonClick = () => {
	initialiseDisplay(Questions[0].question, Questions[0].answers);
};

const handleAnswerButtonClick = (event: Event) => {
	const target = event.currentTarget as HTMLButtonElement;
	//check if an answer button has already been clicked OR has been removed by 50/50
	if (isAnsBtnClicked || removedAnswers.includes(target.innerText)) {
		return;
	}
	//grey out buttons
	helpBtns.forEach((button) => greyOutButton(button));
	answerBtns.forEach((button) => greyOutButton(button));
	//check if answer for current question is correct
	if (target.innerText === getCorrectAnswer()) {
		correctAnswer(target, message, sfxCorrect);
		//update user score
		userScore += 5;
		score.innerText = `Score: ${userScore}`;
	} else {
		incorrectAnswer(target, message, sfxIncorrect);
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
		initialiseDisplay(Questions[0].question, Questions[0].answers);
	}
};

const handleFiftyButtonClick = () => {
	if (isAnsBtnClicked || isFiftyBtnClicked) {
		return;
	}
	// remove answers from grid AND update removedAnswers array
	removedAnswers = removeAnswers(answerBtns, removedAnswers);
	greyOutButton(fiftyFiftyBtn);
	isFiftyBtnClicked = true;
};

const handleAskComButtonClick = () => {
	if (isAnsBtnClicked || isAskComBtnClicked) {
		return;
	}
	generateAnsSuggestion(answerBtns, message);
	greyOutButton(askComBtn);
	isAskComBtnClicked = true;
};

const handleMusicButtonClick = () => {
	if (isMusicMuted) {
		playMusic();
		muteMusicBtn.innerHTML = `<i class="material-icons">volume_up</i>`;
		isMusicMuted = false;
	} else {
		muteMusic();
		muteMusicBtn.innerHTML = `<i class="material-icons">volume_off</i>`;
		isMusicMuted = true;
	}
};

startBtn.addEventListener("click", handleStartButtonClick);
answerBtns.forEach((button) => button.addEventListener("click", handleAnswerButtonClick));
nextBtn.addEventListener("click", handleNextButtonClick);
fiftyFiftyBtn.addEventListener("click", handleFiftyButtonClick);
askComBtn.addEventListener("click", handleAskComButtonClick);
muteMusicBtn.addEventListener("click", handleMusicButtonClick);

// when buttons are hovered over
answerBtns.forEach((button) =>
	button.addEventListener("mouseover", (event: Event) => {
		const target = event.currentTarget as HTMLButtonElement;
		if (isAnsBtnClicked || target.innerText === "") {
			target.style.cursor = "default";
			return;
		}
		modifyBtnOnHover(target);
	})
);

nextBtn.addEventListener("mouseover", () => modifyBtnOnHover(nextBtn));

fiftyFiftyBtn.addEventListener("mouseover", () => {
	if (isAnsBtnClicked || isFiftyBtnClicked) {
		fiftyFiftyBtn.style.cursor = "default";
		return;
	}
	modifyHelpBtnOnHover(fiftyFiftyBtn);
});

askComBtn.addEventListener("mouseover", () => {
	if (isAnsBtnClicked || isAskComBtnClicked) {
		askComBtn.style.cursor = "default";
		return;
	}
	modifyHelpBtnOnHover(askComBtn);
});

// when buttons are hovered off
answerBtns.forEach((button) =>
	button.addEventListener("mouseleave", (event: Event) => {
		const target = event.currentTarget as HTMLButtonElement;
		if (isAnsBtnClicked || target.innerText === "") {
			return;
		}
		ungreyAnsButton(target);
	})
);

nextBtn.addEventListener("mouseleave", () => ungreyAnsButton(nextBtn));

fiftyFiftyBtn.addEventListener("mouseleave", () => {
	if (isAnsBtnClicked || isFiftyBtnClicked) {
		return;
	}
	ungreyHelpButton(fiftyFiftyBtn);
});

askComBtn.addEventListener("mouseleave", () => {
	if (isAnsBtnClicked || isAskComBtnClicked) {
		return;
	}
	ungreyHelpButton(askComBtn);
});

// begin quiz
displayMenu();
