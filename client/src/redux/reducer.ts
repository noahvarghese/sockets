import {
	ADD_NAME,
	ADD_SERVER,
	ADD_ROLE,
	ADD_MATCHING_PROPERTY,
	ADD_MATCHING_VALUE,
	ADD_MULTIPLECHOICE_QUESTION,
	ADD_MULTIPLECHOICE_ANSWER,
} from "./actionTypes";

import state from "../components/StateProps";

const initialState: state = {
	info: {
		name: "",
		role: "",
		server: "",
	},
	multipleChoice: {
		question: "",
		answers: [],
	},
	matching: {
		properties: [],
		vals: [],
	},
};

const reducer = (state = initialState, { type, payload }) => {
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
				multipleChoice: {
					...state.multipleChoice,
					question: payload,
				},
			};
		}
		case ADD_MULTIPLECHOICE_ANSWER: {
			return {
				...state,
				multipleChoice: {
					...state.multipleChoice,
					answers: state.multipleChoice.answers.concat(payload),
				},
			};
		}
		case ADD_MATCHING_PROPERTY: {
			return {
				...state,
				matching: {
					...state.matching.vals,
					properties: state.matching.properties.concat(payload),
				},
			};
		}
		case ADD_MATCHING_VALUE: {
			return {
				...state,
				matching: {
					...state.matching.properties,
					vals: state.matching.vals.concat(payload),
				},
			};
		}
		default:
			return state;
	}
};

export default reducer;
