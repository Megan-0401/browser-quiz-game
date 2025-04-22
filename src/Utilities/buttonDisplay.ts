// changing colour modifications to buttons

// button colours
const ansBtnCol = "linear-gradient(#6a4c93, #e1a157)";
const helpBtnCol = "linear-gradient(#5293b5, #6a4c93)";
const textCol = "#363732ff";
const borderStyle = "2px solid #e1a157";

// hovered button colours
const ansBtnHoverCol = "linear-gradient(#a77de1, #fff38b)";
const helpBtnHoverCol = "linear-gradient(#85e0ff, #a77de1)";
const textHoverCol = "#5d4755";
const borderHoverStyle = "2px solid #fff38b";

// greyed-out colours
const greyedOut = "linear-gradient(#96a0af, #636883)";
const greyedOutBorder = "2px solid #636883";
const greyedOutText = "#636883";

export const greyOutButton = (greyedBtn: HTMLButtonElement) => {
	greyedBtn.style.backgroundImage = greyedOut;
	greyedBtn.style.border = greyedOutBorder;
	greyedBtn.style.color = greyedOutText;
};

export const modifyBtnOnHover = (button: HTMLButtonElement) => {
	button.style.color = textHoverCol;
	button.style.backgroundImage = ansBtnHoverCol;
	button.style.border = borderHoverStyle;
	button.style.cursor = "pointer";
};

export const modifyHelpBtnOnHover = (button: HTMLButtonElement) => {
	button.style.color = textHoverCol;
	button.style.backgroundImage = helpBtnHoverCol;
	button.style.border = borderHoverStyle;
	button.style.cursor = "pointer";
};

export const ungreyAllButtons = (
	ansBtns: NodeListOf<HTMLButtonElement>,
	helpBtns: NodeListOf<HTMLButtonElement>
) => {
	ungreyAllAnsButtons(ansBtns);
	helpBtns.forEach((button) => ungreyHelpButton(button));
};

export const ungreyAllAnsButtons = (ansBtns: NodeListOf<HTMLButtonElement>) => {
	ansBtns.forEach((btn) => {
		ungreyAnsButton(btn);
	});
};

export const ungreyAnsButton = (button: HTMLButtonElement) => {
	button.style.color = textCol;
	button.style.backgroundImage = ansBtnCol;
	button.style.border = borderStyle;
};

export const ungreyHelpButton = (button: HTMLButtonElement) => {
	button.style.color = textCol;
	button.style.backgroundImage = helpBtnCol;
	button.style.border = borderStyle;
};
