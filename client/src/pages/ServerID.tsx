import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setServer } from "../redux/actions";
import { setStateFromElementChange } from "../Util/Functions";

const ServerID = ({ role, setServer, ...props }) => {
	const path = `/${role.toLowerCase()}`;

	let history = useHistory();

	const [state, setState] = useState({ serverID: "" });

	return (
		<>
			<h2>
				{role === "Teacher"
					? "Create A Custom Server ID"
					: "Enter The Server ID"}
			</h2>
			<input
				name="serverID"
				type="text"
				aria-label="Server ID"
				value={state.serverID}
				onChange={(e) => setStateFromElementChange(e, setState, state)}
			/>
			<button
				className="default"
				onClick={(e) => {
					e.preventDefault();
					setServer(state.serverID);
					history.push(path);
				}}
			>
				Continue
			</button>
		</>
	);
};

export default connect(
	(state) => state.info,
	(dispatch) =>
		bindActionCreators(
			{
				setServer: setServer,
			},
			dispatch
		)
)(ServerID);
