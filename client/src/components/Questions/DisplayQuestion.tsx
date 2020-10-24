import React, { useEffect } from "react";
import { connect } from "react-redux";
import { resetQuestion, setQuestion } from "../../redux/actions";
import DisplayMultipleChoice from "./MultipleChoice/DisplayMultipleChoice";
import DisplayMatching from "./MatchingPairs/DisplayMatching";
import state, {
	matching,
	mc,
	questionInfo,
} from "../InterfaceDefaults/StateProps";

interface DisplayQuestionProps {
	info: questionInfo;
	matching: matching;
	multipleChoice: mc;
	matchingAnswers: String[];
	server: String;
	timeLeft: Number;
	socket: any;
	setQuestion: Function;
	resetQuestion: Function;
}

const DisplayQuestion: React.FC<DisplayQuestionProps> = ({
	info,
	matching,
	multipleChoice,
	matchingAnswers,
	server,
	timeLeft,
	socket,
	setQuestion,
	resetQuestion,
	...props
}) => {
	useEffect(() => {
		socket.on("sendQuestion", (data) => {
			// remove all
			setQuestion(data);
		});
	});

	const submitAnswer = () => {
		socket.emit("submitAnswer", {
			answer: {
				info: info,
				matching: {
					properties: matching.properties,
					vals: matchingAnswers,
				},
				multipleChoice: multipleChoice,
			},
			server: server,
		});
		resetQuestion();
	};

	if (info.type !== "" && timeLeft === 0) {
		submitAnswer();
		return <h3>Waiting for question...</h3>;
	} else {
		return (
			<>
				{info.type === "Multiple Choice" ? (
					<DisplayMultipleChoice />
				) : info.type === "Matching Pairs" ? (
					<DisplayMatching />
				) : (
					<h3>Waiting for question...</h3>
				)}
				{info.type !== "" ? (
					<button className="default" onClick={() => submitAnswer()}>
						Submit
					</button>
				) : null}
			</>
		);
	}
};

export default connect(
	(state: state) => ({
		info: state.question.info,
		matching: state.question.matching,
		multipleChoice: state.question.multipleChoice,
		matchingAnswers: state.matchingAnswers,
		server: state.info.server,
		timeLeft: state.timeLeft,
	}),
	(dispatch) => {
		return {
			setQuestion: (question) => dispatch(setQuestion(question)),
			resetQuestion: () => dispatch(resetQuestion()),
		};
	}
)(DisplayQuestion);
