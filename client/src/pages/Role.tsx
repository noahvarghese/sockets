import React from "react";
import { useHistory } from "react-router-dom";

const Role = ({ setGlobalState, ...props }) => {
	const key = "role";
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
							setGlobalState(e, key, role, path);
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
							setGlobalState(e, key, role);
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

export default Role;
