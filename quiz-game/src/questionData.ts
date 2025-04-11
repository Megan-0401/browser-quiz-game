// index 0 will ALWAYS be the correct answer

type QuestionData = {
	questionId: number;
	question: string;
	answers: string[];
};

export const Questions: QuestionData[] = [
	{
		questionId: 1,
		question: "Shibuya Crossing is located in which Japanese city?",
		answers: ["Tokyo", "Kyoto", "Kobe", "Nagoya"],
	},

	{
		questionId: 2,
		question:
			"What is the name of the art technique in which depth is created by manipulating the appearance of an object?",
		answers: ["Foreshortening", "Foreshadowing", "Composition", "Anatomy"],
	},

	{
		questionId: 3,
		question:
			"In JavaScript, what is the name of the array method that applies a given function to each element in an array, and returns a new array of those values?",
		answers: [".map()", ".forEach()", ".filter()", ".flatMap()"],
	},

	{
		questionId: 4,
		question: "Which of these race courses did not originate from Mario Kart Wii?",
		answers: ["Sunshine Airport", "Coconut Mall", "Mushroom Gorge", "Moonview Highway"],
	},

	{
		questionId: 5,
		question:
			"In the television series Peep Show, which series does the character Dobby first appear in?",
		answers: ["Series 5", "Series 4", "Series 6", "Series 7"],
	},

	{
		questionId: 6,
		question:
			"The track <i>On Melancholy Hill</i> by the band Gorillaz was featured in which album?",
		answers: ["Plastic Beach", "Demon Days", "Humanz", "The Now Now"],
	},

	{
		questionId: 7,
		question: "What was the heaviest theropod (bipedal dinosaur) to be discovered?",
		answers: ["Tyrannosaurus rex", "Giganotosaurus", "Spinosaurus", "Carnotaurus"],
	},
];

// template to add new questions

// {
// 	questionId: 0,
// 	question: "",
// 	answers: [],
// },
