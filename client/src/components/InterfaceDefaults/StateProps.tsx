export interface info {
	name: String;
	role: String;
	server: String;
}

export interface questionInfo {
	time?: Number;
	score?: Number;
	type: String;
}

export interface question {
	info: questionInfo;
	matching: matching;
	multipleChoice: mc;
	submitted: boolean;
}

export interface mcAnswer {
	text: string;
	correct?: boolean;
}

export interface mc {
	question: String;
	answers: mcAnswer[];
}

export interface matching {
	properties: String[];
	vals: String[];
}

export interface state {
	info: info;
	question: question;
	timeLeft: Number;
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
		answers: [{ text: "", correct: false }],
	},
	submitted: false,
};

export default state;
