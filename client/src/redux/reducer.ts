import {
	ADD_NAME,
	ADD_SERVER,
	ADD_ROLE,
	ADD_MATCHING_PROPERTY,
	ADD_MATCHING_VALUE,
	ADD_MULTIPLECHOICE_QUESTION,
	ADD_MULTIPLECHOICE_ANSWER,
	ADD_QUESTION,
	ADD_MATCHING,
	ADD_MULTIPLECHOICE,
} from "./actionTypes";

import state from "../components/StateProps";

const initialState: state = {
	info: {
		name: "",
		role: "",
		server: "",
	},
	question: {
		type: "",
		time: 0,
		score: 0,
		multipleChoice: {
			question: "",
			answers: [],
		},
		matching: {
			properties: [],
			vals: [],
		},
	},
};

const reducer = (state: state = initialState, { type, payload }) => {
	switch (type) {
		case ADD_NAME: {
			return {
				...state,
				info: {
					...state.info,
					name: payload,
				},
			};
		}
		case ADD_SERVER: {
			return {
				...state,
				info: {
					...state.info,
					server: payload,
				},
			};
		}
		case ADD_ROLE: {
			return {
				...state,
				info: {
					...state.info,
					role: payload,
				},
			};
		}
		case ADD_MULTIPLECHOICE_QUESTION: {
			return {
				...state,
				question: {
					...state.question,
					multipleChoice: {
						...state.question.multipleChoice,
						question: payload,
					},
				},
			};
		}
		case ADD_MULTIPLECHOICE_ANSWER: {
			return {
				...state,
				question: {
					...state.question,
					multipleChoice: {
						...state.question.multipleChoice,
						answers: state.question.multipleChoice.answers.concat(payload),
					},
				},
			};
		}
		case ADD_MATCHING_PROPERTY: {
			return {
				...state,
				question: {
					...state.question,
					matching: {
						...state.question.matching,
						properties: state.question.matching.properties.concat(payload),
					},
				},
			};
		}
		case ADD_MATCHING_VALUE: {
			return {
				...state,
				question: {
					...state.question,
					matching: {
						...state.question.matching,
						vals: state.question.matching.vals.concat(payload),
					},
				},
			};
		}
		case ADD_QUESTION: {
			return {
				...state,
				question: payload,
			};
		}
		case ADD_MATCHING: {
			return {
				...state,
				question: {
					...state.question.multipleChoice,
					matching: payload,
				},
			};
		}
		case ADD_MULTIPLECHOICE: {
			return {
				...state,
				question: {
					...state.question.matching,
					multipleChoice: payload,
				},
			};
		}
		default:
			return state;
	}
};

export default reducer;
