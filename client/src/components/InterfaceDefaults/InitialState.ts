import state, { info, question } from "./StateProps";

export const initialInfo: info = {
	name: "",
	role: "",
	server: "",
};

export const initialQuestion: question = {
	info: {
		type: "",
		score: undefined,
		time: undefined,
	},
	multipleChoice: {
		question: "",
		answers: [{ text: "", correct: false }],
	},
	matching: {
		properties: [""],
		vals: [""],
	},
	submitted: false,
};

export const initialState: state = {
	info: initialInfo,
	question: initialQuestion,
	matchingAnswers: [""],
	timeLeft: -1,
};
