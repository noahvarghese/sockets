import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setQuestion } from "../../redux/actions";
import DisplayMultipleChoice from "./MultipleChoice/DisplayMultipleChoice";
import DisplayMatching from "./MatchingPairs/DisplayMatching";
import state, {
	matching,
	mc,
	questionInfo,
} from "../InterfaceDefaults/StateProps";
import TimeLeft from "../Results/TimeLeft";

interface DisplayQuestionProps {
	info: questionInfo;
	matching: matching;
	multipleChoice: mc;
	socket: any;
	setQuestion: Function;
}

const DisplayQuestion: React.FC<DisplayQuestionProps> = ({
	info,
	matching,
	multipleChoice,
	socket,
	setQuestion,
	...props
}) => {
	useEffect(() => {
		socket.on("sendQuestion", (data) => {
			// remove all
			setQuestion(data);
		});
	});

	console.log(info, matching, multipleChoice);

	const submitAnswer = () => {
		socket.emit("submitAnswer", {
			info: info,
			matching: matching,
			multipleChoice: multipleChoice,
		});
	};

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
				<button className="default" onClick={submitAnswer}>
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
	}),
	(dispatch) => {
		return {
			setQuestion: (question) => dispatch(setQuestion(question)),
		};
	}
)(DisplayQuestion);
