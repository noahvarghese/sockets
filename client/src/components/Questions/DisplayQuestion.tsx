import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addMatchingProperty, addMatchingValue } from "../../redux/actions";
import MatchingLine from "./MatchingPairs/MatchingLine";
import MultipleChoiceAnswer from "./MultipleChoice/MultipleChoiceAnswer";
import MultipleChoiceQuestion from "./MultipleChoice/MultipleChoiceQuestion";
import { initialQuestion } from "../StateProps";

const DisplayQuestion = ({ socket, ...props }) => {
	const [state, setState] = useState(initialQuestion);
	useEffect(() => {
		socket.on("sendQuestion", (data) => {
			// remove all
			setState(data);
		});
	});
	console.log(state.matching);

	// const setQuestion = (question) => {
	// 	setState({
	// 		...state,
	// 		multipleChoice: {
	// 			question: question,
	// 			answers: state.multipleChoice.answers,
	// 		},
	// 	});
	// };

	const setMultipleChoice = (mc, index) => {
		let tempAnswer = state.multipleChoice.answers;
		tempAnswer[index] = mc;
		setState({
			...state,
			multipleChoice: {
				question: state.multipleChoice.question,
				answers: tempAnswer,
			},
		});
	};

	const MatchingLines = state.matching.properties.forEach((property, index) => {
		console.log(property, index);
		return (
			<MatchingLine
				matching={{ property: property, value: state.matching.vals[index] }}
				index={index}
				readOnly={true}
				key={index}
			/>
		);
	});
	console.log(MatchingLines);
	return (
		<>
			{state.info.type === "Multiple Choice" ? (
				<>
					<MultipleChoiceQuestion
						question={state.multipleChoice.question}
						setQuestion={null}
					/>
					{state.multipleChoice.answers.map((answer, index) => (
						<MultipleChoiceAnswer
							correct={answer.correct}
							text={answer.answer}
							index={index}
							key={index}
							setMultipleChoice={setMultipleChoice}
						/>
					))}
				</>
			) : state.info.type === "Matching Pairs" ? (
				state.matching.properties.map((property, index) => (
					<MatchingLine
						matching={{
							property: property,
							value: state.matching.vals[index],
						}}
						index={index}
						readOnly={true}
						key={index}
					/>
				))
			) : (
				// <h1>Hi</h1>
				<h1>Waiting for question...</h1>
			)}
		</>
	);
};

export default connect(
	(_) => _,
	(dispatch) =>
		bindActionCreators(
			{
				addMatchingProperty: addMatchingProperty,
				addMatchingValue: addMatchingValue,
			},
			dispatch
		)
)(DisplayQuestion);
