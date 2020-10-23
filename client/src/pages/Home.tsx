import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DisplayQuestion from "../components/Questions/DisplayQuestion";
import SelectQuestionType from "../components/Questions/SelectQuestionType";
import state from "../components/InterfaceDefaults/StateProps";

const Home = ({ role, socket, ...props }) => {
	return (
		<>
			<h1>{role.toUpperCase()}</h1>
			<hr />
			{role === "Teacher" ? (
				<SelectQuestionType socket={socket} />
			) : (
				<DisplayQuestion socket={socket} />
			)}
		</>
	);
};

export default connect(
	(state: state) => ({ role: state.info.role }),
	(dispatch) => bindActionCreators({}, dispatch)
)(Home);
