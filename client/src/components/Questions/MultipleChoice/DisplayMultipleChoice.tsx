import React from "react";
import { connect } from "react-redux";
import state from "../../InterfaceDefaults/StateProps";
import MultipleChoiceAnswer from "./MultipleChoiceAnswer";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";

const DisplayMultipleChoice = ({ multipleChoice }) => {
	return (
		<>
			<h3>Multiple Choice</h3>
			<MultipleChoiceQuestion />
			{multipleChoice.answers.map((_, index) => (
				<MultipleChoiceAnswer index={index} key={index} />
			))}
		</>
	);
};

export default connect(
	(state: state) => ({
		multipleChoice: state.question.multipleChoice,
	}),
	(_) => ({})
)(DisplayMultipleChoice);
