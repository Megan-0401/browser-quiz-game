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

export const correctAnswer = (
	button: HTMLButtonElement,
	message: HTMLDivElement,
	audio: HTMLAudioElement
) => {
	button.style.background = "linear-gradient(#7af0bf, #289683)";
	button.style.border = "2px solid #289683";
	button.style.color = "#136b5c";
	message.innerText = "Correct! Great job";
	playSound(audio);
};

export const incorrectAnswer = (
	button: HTMLButtonElement,
	message: HTMLDivElement,
	audio: HTMLAudioElement
) => {
	button.style.background = "linear-gradient(#f4acb7ff, #c7576f)";
	button.style.border = "2px solid #c7576f";
	button.style.color = "#9b364c";
	message.innerText = "Better luck next time";
	playSound(audio);
};

const playSound = (audio: HTMLAudioElement) => {
	audio.volume = 0.6;
	audio.play();
};
