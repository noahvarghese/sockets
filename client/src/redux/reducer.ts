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
	SET_INFO,
	UPDATE_TIME_LEFT,
} from "./actionTypes";

import state from "../components/StateProps";

const initialState: state = {
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
					answer: "",
					correct: false,
				},
			],
		},
		matching: {
			properties: [],
			vals: [],
		},
	},
	timeLeft: -1,
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
			const existingAnswers = state.question.multipleChoice.answers;
			let newAnswers;

			if (payload.index !== null) {
				newAnswers = [
					...existingAnswers.slice(0, payload.index - 1),
					payload.answer,
					...existingAnswers.slice(payload.index + 1),
				];
			} else {
				newAnswers = existingAnswers.concat(payload.answer);
			}
			return {
				...state,
				question: {
					...state.question,
					multipleChoice: {
						...state.question.multipleChoice,
						answers: newAnswers,
					},
				},
			};
		}
		case ADD_MATCHING_PROPERTY: {
			const existingProperties = state.question.matching.properties;
			let newProperties;

			if (payload.index !== null) {
				newProperties = [
					...existingProperties.slice(0, payload.index - 1),
					payload.property,
					...existingProperties.slice(payload.index + 1),
				];
			} else {
				newProperties = existingProperties.concat(payload.property);
			}

			return {
				...state,
				question: {
					...state.question,
					matching: {
						...state.question.matching,
						properties: newProperties,
					},
				},
			};
		}
		case ADD_MATCHING_VALUE: {
			const existingVals = state.question.matching.vals;
			let newVals;

			if (payload.index !== null) {
				newVals = [
					...existingVals.slice(0, payload.index - 1),
					payload.val,
					...existingVals.slice(payload.index + 1),
				];
			} else {
				newVals = existingVals.concat(payload.val);
			}
			return {
				...state,
				question: {
					...state.question,
					matching: {
						...state.question.matching,
						vals: newVals,
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
		case SET_INFO: {
			return {
				...state,
				question: {
					...state.question,
					info: payload,
				},
			};
		}
		case UPDATE_TIME_LEFT: {
			return {
				...state,
				timeLeft: payload,
			};
		}
		default:
			return state;
	}
};

export default reducer;
