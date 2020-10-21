import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DisplayQuestion from "../components/Questions/DisplayQuestion";
import SelectQuestionType from "../components/Questions/SelectQuestionType";
import { addQuestion } from "../redux/actions";
// import state from "../components/StateProps";

const Home = ({ info, question, socket, ...props }) => {
	return (
		<>
			<h1>{info.role.toUpperCase()}</h1>
			<hr />
			{info.role === "Teacher" ? (
				<SelectQuestionType socket={socket} />
			) : (
				<DisplayQuestion socket={socket} />
			)}
		</>
	);
};

export default connect(
	(state) => state,
	(dispatch) => bindActionCreators({ addQuestion: addQuestion }, dispatch)
)(Home);
