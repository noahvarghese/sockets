import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
	resetQuestion,
	setQuestion,
	setQuestionSubmitted,
	studentSubmitted,
} from "../../redux/actions";
import DisplayMultipleChoice from "./MultipleChoice/DisplayMultipleChoice";
import DisplayMatching from "./MatchingPairs/DisplayMatching";
import state, {
	matching,
	mc,
	questionInfo,
} from "../InterfaceDefaults/StateProps";
import { isTryStatement } from "typescript";
import ViewResults from "../Results/ViewResults";

interface DisplayQuestionProps {
	info: questionInfo;
	matching: matching;
	multipleChoice: mc;
	matchingAnswers: String[];
	submitted: boolean;
	server: String;
	timeLeft: Number;
	socket: any;
	setQuestion: Function;
	submitAnswer: Function;
}

const DisplayQuestion: React.FC<DisplayQuestionProps> = ({
	info,
	matching,
	multipleChoice,
	matchingAnswers,
	submitted,
	server,
	timeLeft,
	socket,
	setQuestion,
	submitAnswer,
	...props
}) => {
	const [correct, setCorrect] = useState("");
	useEffect(() => {
		socket.on("sendQuestion", (data) => {
			// remove all
			setQuestion(data);
		});
		socket.on("sendCorrect", (response) => setCorrect(response));
	});

	const submit = () => {
		let answer;

		if (info.type === "Multiple Choice") {
			answer = multipleChoice.answers;
		} else if (info.type === "Matching Pairs") {
			answer = {
				properties: matching.properties,
				vals: matchingAnswers,
			};
		}

		socket.emit("submitAnswer", {
			answer: answer,
			server: server,
		});
		submitAnswer();
	};

	if (timeLeft === 0 && !submitted && info.type !== "") {
		submit();
	}
	return (
		<>
			{info.type === "Multiple Choice" ? (
				<DisplayMultipleChoice />
			) : info.type === "Matching Pairs" ? (
				<DisplayMatching />
			) : (
				<>
					<h3>{correct !== "" ? correct : null}</h3>
					<ViewResults socket={socket} />
					<h3>Waiting for question...</h3>
				</>
			)}

			{!submitted}
			{info.type !== "" ? (
				<button
					className="default"
					onClick={() => {
						submit();
					}}
				>
					Submit
				</button>
			) : null}
		</>
	);
};
export default connect(
	(state: state) => ({
		info: state.question.info,
		matching: state.question.matching,
		multipleChoice: state.question.multipleChoice,
		matchingAnswers: state.matchingAnswers,
		submitted: state.question.submitted,
		server: state.info.server,
		timeLeft: state.timeLeft,
	}),
	(dispatch) => {
		return {
			setQuestion: (question) => dispatch(setQuestion(question)),
			submitAnswer: () => dispatch(studentSubmitted()),
		};
	}
)(DisplayQuestion);
