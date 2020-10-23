import state from "./StateProps";
export const initialState: state = {
	info: {
		name: "",
		role: "",
		server: "",
	},
	question: {
		info: {
			type: "",
			time: 0,
			score: 0,
		},
		multipleChoice: {
			question: "",
			answers: [
				{
					text: "",
					correct: false,
				},
			],
		},
		matching: {
			properties: [""],
			vals: [""],
		},
		submitted: false,
	},
	timeLeft: -1,
};
