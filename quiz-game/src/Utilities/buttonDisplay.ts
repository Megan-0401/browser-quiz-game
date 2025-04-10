// changing colour modifications to buttons

export const greyOutButton = (greyedBtn: HTMLButtonElement) => {
	greyedBtn.style.backgroundColor = "#96a0af";
	greyedBtn.style.border = "2px solid #636883";
	greyedBtn.style.color = "#636883";
};

export const modifyBtnOnHover = (button: HTMLButtonElement) => {
	button.style.color = "#67695f";
	button.style.backgroundColor = "#7fdbf1";
	button.style.border = "2px solid #7ccdfc";
	button.style.cursor = "pointer";
};

export const modifyHelpBtnOnHover = (button: HTMLButtonElement) => {
	button.style.color = "#5a7eb8";
	button.style.backgroundColor = "#bccfec";
	button.style.border = "2px solid #6aa7e0";
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
	button.style.color = "#363732ff";
	button.style.backgroundColor = "#53d8fbff";
	button.style.border = "2px solid #66c3ffff";
};

export const ungreyHelpButton = (button: HTMLButtonElement) => {
	button.style.backgroundColor = "#a1bbe6";
	button.style.border = "2px solid #3770ca";
	button.style.color = "#345995";
};
