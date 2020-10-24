import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import state from "../components/InterfaceDefaults/StateProps";
import Teacher from "../components/Teacher";
import Student from "../components/Student";
import TimeLeft from "../components/Results/TimeLeft";
import "../assets/css/roleContainer.css";

const Home = ({ role, type, timeLeft, submitted, socket, ...props }) => {
	return (
		<>
			<div className="roleContainer">
				<h1>{role}</h1>
				{(type !== "" && role === "Student") ||
				(submitted && role === "Teacher") ? (
					<TimeLeft socket={socket} />
				) : null}
			</div>
			<hr />
			{role === "Teacher" ? (
				<Teacher socket={socket} />
			) : (
				<Student socket={socket} />
			)}
		</>
	);
};

export default connect(
	(state: state) => ({
		role: state.info.role,
		type: state.question.info.type,
		timeLeft: state.timeLeft,
		submitted: state.question.submitted,
	}),
	(dispatch) => bindActionCreators({}, dispatch)
)(Home);
