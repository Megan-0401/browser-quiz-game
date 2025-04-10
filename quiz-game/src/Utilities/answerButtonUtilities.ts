// utilities relating to the answer buttons functions

export const randomiseAnsOrder = (answers: string[]): string[] => {
	const newArray: string[] = [...answers];

	for (let i: number = 0; i < answers.length; i++) {
		// generate a random index value
		let j: number = Math.ceil(Math.random() * 4) - 1;
		// swap the value of the current index with the value of the random index
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}
	return newArray;
};

export const correctAnswer = (button: HTMLButtonElement, message: HTMLDivElement) => {
	//change answer button to green
	button.style.backgroundColor = "#7af0bf";
	button.style.border = "2px solid #289683";
	button.style.color = "#289683";
	//display message
	message.innerText = "Correct! Great job";
};

export const incorrectAnswer = (button: HTMLButtonElement, message: HTMLDivElement) => {
	//change answer button to red
	button.style.backgroundColor = "#f4acb7ff";
	button.style.border = "2px solid #c7576f";
	button.style.color = "#c7576f";
	//display message
	message.innerText = "Better luck next time";
};
