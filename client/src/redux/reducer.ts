import { ADD_NAME, ADD_SERVER, ADD_ROLE } from "./actionTypes";

const initialState = {
	info: {
		name: "",
		role: "",
		server: "",
	},
	questions: [],
};

export default (state = initialState, { type, payload }) => {
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
		default:
			return state;
	}
};
