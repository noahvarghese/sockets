import React from "react";
import { connect } from "react-redux";
import SelectQuestionType from "./Questions/SelectQuestionType";
import state from "./InterfaceDefaults/StateProps";

const Teacher = ({ submitted, socket, ...props }) => {
	return (
		<div>
			<SelectQuestionType socket={socket} />
		</div>
	);
};

export default connect(
	(state: state) => ({
		submitted: state.question.submitted,
	}),
	(_) => ({})
)(Teacher);
