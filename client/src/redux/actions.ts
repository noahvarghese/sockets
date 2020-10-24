import { initialState } from "../components/InterfaceDefaults/InitialState";
import {
	SET_MATCHING_PROPERTY,
	SET_MATCHING_VALUE,
	SET_MULTIPLECHOICE_ANSWER_TEXT,
	SET_MULTIPLECHOICE_ANSWER_CORRECT,
	SET_NAME,
	SET_ROLE,
	SET_SERVER,
	SET_MULTIPLECHOICE_QUESTION,
	SET_QUESTION_INFO,
	SET_MATCHING,
	SET_MULTIPLECHOICE,
	SET_TIME_LEFT,
	SET_QUESTION_TYPE,
	SET_QUESTION_TIME,
	SET_QUESTION_SCORE,
	RESET_QUESTION,
	SET_QUESTION,
	SET_MULTIPLECHOICE_ANSWER,
	SET_QUESTION_SUBMITTED,
} from "./actionTypes";

export const setName = (name) => ({
	type: SET_NAME,
	payload: name,
});

export const setRole = (role) => ({
	type: SET_ROLE,
	payload: role,
});

export const setServer = (server) => ({
	type: SET_SERVER,
	payload: server,
});

export const resetQuestion = () => ({
	type: RESET_QUESTION,
	payload: initialState.question,
});

export const setQuestion = (question) => {
	console.log(question);
	return {
		type: SET_QUESTION,
		payload: question,
	};
};

export const setQuestionInfo = (info) => ({
	type: SET_QUESTION_INFO,
	payload: info,
});

export const setQuestionType = (type) => ({
	type: SET_QUESTION_TYPE,
	payload: type,
});

export const setQuestionTime = (time) => ({
	type: SET_QUESTION_TIME,
	payload: time,
});

export const setQuestionScore = (score) => ({
	type: SET_QUESTION_SCORE,
	payload: score,
});

export const setMatching = (matching) => ({
	type: SET_MATCHING,
	payload: matching,
});

export const setMatchingProperty = (property, index) => ({
	type: SET_MATCHING_PROPERTY,
	payload: { property: property, index: index },
});

export const setMatchingValue = (val, index) => ({
	type: SET_MATCHING_VALUE,
	payload: { val: val, index: index },
});

export const setMultipleChoice = (mc) => ({
	type: SET_MULTIPLECHOICE,
	payload: mc,
});

export const setMultipleChoiceQuestion = (question) => ({
	type: SET_MULTIPLECHOICE_QUESTION,
	payload: question,
});

export const setMultipleChoiceAnswer = (multipleChoiceAnswer) => ({
	type: SET_MULTIPLECHOICE_ANSWER,
	payload: multipleChoiceAnswer,
});

export const setMultipleChoiceAnswerText = (multipleChoiceText, index) => ({
	type: SET_MULTIPLECHOICE_ANSWER_TEXT,
	payload: { text: multipleChoiceText, index: index },
});

export const setMultipleChoiceAnswerCorrect = (
	multipleChoiceCorrect,
	index
) => ({
	type: SET_MULTIPLECHOICE_ANSWER_CORRECT,
	payload: { correct: multipleChoiceCorrect, index: index },
});

export const setQuestionSubmitted = (submitted: boolean) => ({
	type: SET_QUESTION_SUBMITTED,
	payload: submitted,
});

export const setTimeLeft = (time) => ({
	type: SET_TIME_LEFT,
	payload: time,
});
