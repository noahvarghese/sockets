import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
	setMatchingProperty,
	setMatchingValue,
	setQuestion,
} from "../../redux/actions";
import MultipleChoiceAnswer from "./MultipleChoice/MultipleChoiceAnswer";
import MultipleChoiceQuestion from "./MultipleChoice/MultipleChoiceQuestion";
import state, { initialQuestion } from "../InterfaceDefaults/StateProps";
import TimeLeft from "../Results/TimeLeft";

const DisplayQuestion = ({
	info,
	matching,
	multipleChoice,
	socket,
	...props
}) => {
	useEffect(() => {
		socket.on("sendQuestion", (data) => {
			// remove all
			setQuestion(data);
		});
	}, []);

	return (
		<>
			{info.type !== "" ? <TimeLeft socket={socket} /> : null}
			{info.type === "Multiple Choice" ? (
				<>
					<MultipleChoiceQuestion />
					{multipleChoice.answers.map((answer, index) => (
						<MultipleChoiceAnswer index={index} key={index} />
					))}
				</>
			) : info.type === "Matching Pairs" ? (
				matching.properties.map((property, index) => (
					<div>
						<input
							type="text"
							value={property as string}
							key={index}
							readOnly={true}
						/>
						<select>
							<option></option>
							{matching.vals.map((val, index) => (
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
	(state: state) => ({
		info: state.question.info,
		matching: state.question.matching,
		multipleChoice: state.question.multipleChoice,
	}),
	(dispatch) =>
		bindActionCreators(
			{
				setQuestion: setQuestion,
			},
			dispatch
		)
)(DisplayQuestion);
