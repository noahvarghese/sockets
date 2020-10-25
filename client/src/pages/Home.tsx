import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import state from "../components/InterfaceDefaults/StateProps";
import Teacher from "../components/Teacher";
import Student from "../components/Student";
import TimeLeft from "../components/Results/TimeLeft";
import "../assets/css/roleContainer.css";
import Score from "../components/Results/Score";
import { info } from "console";

const Home = ({ info, type, timeLeft, submitted, socket, ...props }) => {
	const role = info.role;
	return (
		<>
			<div className="roleContainer">
				<h1>
					{role}: {info.name}
				</h1>
				{(type !== "" && role === "Student") ||
				(submitted && role === "Teacher") ? (
					<TimeLeft socket={socket} />
				) : null}
				{role === "Student" ? <Score socket={socket} /> : null}
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
		info: state.info,
		type: state.question.info.type,
		timeLeft: state.timeLeft,
		submitted: state.question.submitted,
	}),
	(dispatch) => bindActionCreators({}, dispatch)
)(Home);
