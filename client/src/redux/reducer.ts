import {
	SET_NAME,
	SET_SERVER,
	SET_ROLE,
	SET_MATCHING_PROPERTY,
	SET_MATCHING_VALUE,
	SET_MULTIPLECHOICE_QUESTION,
	SET_MULTIPLECHOICE_ANSWER_TEXT,
	SET_MULTIPLECHOICE_ANSWER_CORRECT,
	SET_MATCHING,
	SET_MULTIPLECHOICE,
	SET_QUESTION_INFO,
	SET_TIME_LEFT,
	SET_QUESTION_TYPE,
	SET_QUESTION_TIME,
	SET_QUESTION_SCORE,
	RESET_QUESTION,
	SET_MULTIPLECHOICE_ANSWER,
	SET_QUESTION,
	SET_QUESTION_SUBMITTED,
	SET_MATCHING_ANSWERS,
	SET_SCORE,
	STUDENT_SUBMITTED,
} from "./actionTypes";

import state, { mcAnswer } from "../components/InterfaceDefaults/StateProps";
import {
	initialQuestion,
	initialState,
} from "../components/InterfaceDefaults/InitialState";

const reducer = (state: state = initialState, { type, payload }) => {
	switch (type) {
		case SET_NAME: {
			return {
				...state,
				info: {
					...state.info,
					name: payload,
				},
			};
		}
		case SET_SERVER: {
			return {
				...state,
				info: {
					...state.info,
					server: payload,
				},
			};
		}
		case SET_ROLE: {
			return {
				...state,
				info: {
					...state.info,
					role: payload,
				},
			};
		}
		case SET_QUESTION: {
			let matchingAnswer: String[] = [""];
			if (state.info.role === "Student") {
				// start at one because matching answer should always have at least one?
				for (let i = 1; i < payload.matching.properties.length; i++) {
					matchingAnswer.push("");
				}
			}
			return {
				...state,
				question: payload,
				matchingAnswers: matchingAnswer,
			};
		}
		case RESET_QUESTION: {
			return {
				...state,
				question: payload,
			};
		}
		case SET_QUESTION_INFO: {
			return {
				...state,
				question: {
					...state.question,
					info: payload,
				},
			};
		}
		case SET_QUESTION_TYPE: {
			return {
				...state,
				question: {
					...state.question,
					info: {
						...state.question.info,
						type: payload,
					},
					multipleChoice: initialState.question.multipleChoice,
					matching: initialState.question.matching,
				},
			};
		}
		case SET_QUESTION_TIME: {
			return {
				...state,
				question: {
					...state.question,
					info: {
						...state.question.info,
						time: payload,
					},
				},
			};
		}
		case SET_QUESTION_SCORE: {
			return {
				...state,
				question: {
					...state.question,
					info: {
						...state.question.info,
						score: payload,
					},
				},
			};
		}
		case SET_MULTIPLECHOICE: {
			return {
				...state,
				question: {
					...state.question.matching,
					multipleChoice: payload,
				},
			};
		}
		case SET_MULTIPLECHOICE_QUESTION: {
			return {
				...state,
				question: {
					...state.question,
					multipleChoice: {
						question: payload,
						answers: state.question.multipleChoice.answers,
					},
					matching: state.question.matching,
				},
			};
		}
		case SET_MULTIPLECHOICE_ANSWER: {
			return {
				...state,
				question: {
					...state.question,
					multipleChoice: {
						...state.question.multipleChoice,
						answers: payload,
					},
				},
			};
		}
		case SET_MULTIPLECHOICE_ANSWER_TEXT: {
			const existingAnswers = state.question.multipleChoice.answers;
			let newAnswers: mcAnswer[] = [];

			for (let i = 0; i < existingAnswers.length; i++) {
				let el;

				if (i !== payload.index) {
					el = existingAnswers[i];
				} else {
					el = {
						text: payload.text,
						correct: existingAnswers[payload.index].correct,
					};
				}

				newAnswers.push(el);
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
		case SET_MULTIPLECHOICE_ANSWER_CORRECT: {
			const existingAnswers = state.question.multipleChoice.answers;
			let newAnswers: mcAnswer[] = [];

			for (let i = 0; i < existingAnswers.length; i++) {
				let el;

				if (i !== payload.index) {
					el = existingAnswers[i];
				} else {
					el = {
						text: existingAnswers[payload.index].text,
						correct: payload.correct,
					};
				}

				newAnswers.push(el);
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
		case SET_MATCHING: {
			return {
				...state,
				question: {
					...state.question,
					matching: payload,
				},
			};
		}
		case SET_MATCHING_PROPERTY: {
			const existingProperties = state.question.matching.properties;
			let newProperties: string[] = [];

			for (let i = 0; i < existingProperties.length; i++) {
				let el;
				if (i !== payload.index) {
					el = existingProperties[i];
				} else {
					el = payload.property;
				}

				newProperties.push(el);
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
		case SET_MATCHING_VALUE: {
			const existingVals = state.question.matching.vals;
			let newVals: string[] = [];

			for (let i = 0; i < existingVals.length; i++) {
				let el;
				if (i !== payload.index) {
					el = existingVals[i];
				} else {
					el = payload.val;
				}

				newVals.push(el);
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
		case SET_QUESTION_SUBMITTED: {
			return {
				...state,
				question: {
					...state.question,
					submitted: payload,
				},
			};
		}
		case SET_TIME_LEFT: {
			return {
				...state,
				timeLeft: payload,
			};
		}
		case SET_MATCHING_ANSWERS: {
			let newState: String[] = [];

			for (let i = 0; i < state.matchingAnswers.length; i++) {
				if (i !== payload.index) {
					newState.push(state.matchingAnswers[i]);
				} else {
					newState.push(payload.value);
				}
			}

			return {
				...state,
				matchingAnswers: newState,
			};
		}
		case SET_SCORE: {
			return {
				...state,
				currentScore: payload,
			};
		}
		case STUDENT_SUBMITTED: {
			return {
				...state,
				question: initialQuestion,
				matchingAnswers: [""],
				timeLeft: -1,
			};
		}
		default:
			return state;
	}
};

export default reducer;
