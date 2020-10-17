import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setRole } from "../redux/actions";

const Role = ({ setRole, ...props }) => {
	// const key = "role";
	const path = "/screenName";
	let history = useHistory();

	return (
		<>
			<h2>Are You A Teacher Or Student?</h2>
			<ul>
				<li>
					<button
						onClick={(e) => {
							const role = "Teacher";
							setRole(role);
							history.push(path);
						}}
					>
						Teacher
					</button>
				</li>
				<li>
					<button
						onClick={(e) => {
							const role = "Student";
							setRole(role);
							history.push(path);
						}}
					>
						Student
					</button>
				</li>
			</ul>
		</>
	);
};

export default connect(
	(state) => state,
	(dispatch) =>
		bindActionCreators(
			{
				setRole: setRole,
			},
			dispatch
		)
)(Role);
