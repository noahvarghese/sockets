import {
	ADD_MATCHING_PROPERTY,
	ADD_MATCHING_VALUE,
	ADD_MULTIPLECHOICE_ANSWER,
	ADD_NAME,
	ADD_ROLE,
	ADD_SERVER,
	ADD_MULTIPLECHOICE_QUESTION,
	SET_INFO,
	ADD_QUESTION,
	ADD_MATCHING,
	ADD_MULTIPLECHOICE,
} from "./actionTypes";

export const setRole = (role) => ({
	type: ADD_ROLE,
	payload: role,
});

export const setName = (name) => ({
	type: ADD_NAME,
	payload: name,
});

export const setServer = (server) => ({
	type: ADD_SERVER,
	payload: server,
});

export const addMultipleChoiceQuestion = (question) => ({
	type: ADD_MULTIPLECHOICE_QUESTION,
	payload: question,
});

export const addMultipleChoiceAnswer = (multipleChoice) => ({
	type: ADD_MULTIPLECHOICE_ANSWER,
	payload: multipleChoice,
});

export const addMatchingProperty = (matching) => ({
	type: ADD_MATCHING_PROPERTY,
	payload: matching,
});

export const addMatchingValue = (matching) => ({
	type: ADD_MATCHING_VALUE,
	payload: matching,
});

export const setInfo = (info) => ({
	type: SET_INFO,
	payload: info,
});

export const addQuestion = (question) => ({
	type: ADD_QUESTION,
	payload: question,
});

export const addMatching = (matching) => ({
	type: ADD_MATCHING,
	payload: matching,
});

export const addMultipleChoice = (mc) => ({
	type: ADD_MULTIPLECHOICE,
	payload: mc,
});
