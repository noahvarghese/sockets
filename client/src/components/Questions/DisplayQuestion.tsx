import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addMatchingProperty, addMatchingValue } from "../../redux/actions";
import MultipleChoiceAnswer from "./MultipleChoice/MultipleChoiceAnswer";
import MultipleChoiceQuestion from "./MultipleChoice/MultipleChoiceQuestion";
import { initialQuestion } from "../StateProps";
import TimeLeft from "../TimeLeft";

const DisplayQuestion = ({ socket, ...props }) => {
	const [state, setState] = useState({ ...initialQuestion });
	useEffect(() => {
		socket.on("sendQuestion", (data) => {
			// remove all
			setState(data);
		});
	}, []);

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

	return (
		<>
			{state.info.type !== "" ? <TimeLeft socket={socket} /> : null}
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
					<div>
						<input
							type="text"
							value={property as string}
							key={index}
							readOnly={true}
						/>
						<select>
							<option></option>
							{state.matching.vals.map((val, index) => (
								<option key={index}>{val}</option>
							))}
						</select>
					</div>
				))
			) : (
				// <h1>Hi</h1>
				<h3>Waiting for question...</h3>
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
