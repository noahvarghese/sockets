import React from "react";
import { connect } from "react-redux";
import state from "./InterfaceDefaults/StateProps";
import DisplayQuestion from "./Questions/DisplayQuestion";

const Student = ({ submitted, socket }) => {
	return <div>{!submitted ? <DisplayQuestion socket={socket} /> : null}</div>;
};

export default connect(
	(state: state) => ({
		submitted: state.question.submitted,
	}),
	(_) => ({})
)(Student);
