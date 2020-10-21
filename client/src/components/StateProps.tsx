export interface info {
	name: String;
	role: String;
	server: String;
}

export interface quizInfo {
	time?: Number;
	score?: Number;
	type: String;
}

export interface question {
	info: quizInfo;
	matching: matching;
	multipleChoice: mc;
}

export interface mc {
	question: String;
	answers: [
		{
			answer: string;
			correct?: Boolean;
		}
	];
}

export interface matching {
	properties: String[];
	vals: String[];
}

export interface state {
	info: info;
	question: question;
}

export const initialQuestion: question = {
	info: {
		type: "",
		score: undefined,
		time: undefined,
	},
	matching: {
		properties: [""],
		vals: [""],
	},
	multipleChoice: {
		question: "",
		answers: [{ answer: "", correct: false }],
	},
};

export default state;
